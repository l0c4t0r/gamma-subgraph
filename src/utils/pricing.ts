/* eslint-disable prefer-const */
import {
  Address,
  BigDecimal,
  BigInt,
  dataSource,
} from "@graphprotocol/graph-ts";
import { isUSDC, isZero } from "./tokens";
import { ONE_BD, ZERO_BD, constantAddresses } from "./constants";
import {
  UniswapV3Pool,
  UniswapV3HypervisorConversion,
} from "../../generated/schema";
import { getOrCreateHypervisor } from "./uniswapV3/hypervisor";

let USDC_DECIMAL_FACTOR = 10 ** 6;
export function getExchangeRate(
  poolAddress: Address,
  baseTokenIndex: i32
): BigDecimal {
  // Get ratios to convert token0 to token1 and vice versa
  let pool = UniswapV3Pool.load(poolAddress.toHex()) as UniswapV3Pool;
  let sqrtPriceX96 = pool.sqrtPriceX96;
  let num = sqrtPriceX96.times(sqrtPriceX96).toBigDecimal();
  let Q192_BI = BigInt.fromI32(2).pow(192);
  let denom = new BigDecimal(Q192_BI);

  let price = ZERO_BD;
  if (baseTokenIndex == 0 && num > ZERO_BD) {
    price = denom.div(num); // This is rate of token1 in token0
  } else if (baseTokenIndex == 1) {
    price = num.div(denom); // This is rate of token0 in token1
  }
  return price;
}

export function getEthRateInUSDC(): BigDecimal {
  let addressLookup = constantAddresses.network(dataSource.network());
  let poolAddress = addressLookup.get("WETH-USDC") as string;
  let usdcIndex = BigInt.fromString(
    addressLookup.get("WETH-USDC-Index") as string
  ).toI32();

  let ethInUsdcRate = getExchangeRate(
    Address.fromString(poolAddress),
    usdcIndex
  );
  let rate = ethInUsdcRate.div(
    BigDecimal.fromString(USDC_DECIMAL_FACTOR.toString())
  );

  return rate as BigDecimal;
}

export function getGammaRateInUSDC(): BigDecimal {
  let addressLookup = constantAddresses.network(dataSource.network());
  let poolAddressGamma = addressLookup.get("GAMMA-WETH") as string;
  let poolAddressUsdc = addressLookup.get("WETH-USDC") as string;
  let usdcIndex = BigInt.fromString(
    addressLookup.get("WETH-USDC-Index") as string
  ).toI32();

  let gammaInEthRate = getExchangeRate(Address.fromString(poolAddressGamma), 1);
  let ethInUsdcRate = getExchangeRate(
    Address.fromString(poolAddressUsdc),
    usdcIndex
  );
  let rate = gammaInEthRate
    .times(ethInUsdcRate)
    .div(BigDecimal.fromString(USDC_DECIMAL_FACTOR.toString()));

  return rate as BigDecimal;
}

export function getVisrRateInUSDC(): BigDecimal {
  let addressLookup = constantAddresses.network(dataSource.network());
  let poolAddressVisr = addressLookup.get("WETH-VISR") as string;
  let poolAddressUsdc = addressLookup.get("WETH-USDC") as string;
  let usdcIndex = BigInt.fromString(
    addressLookup.get("WETH-USDC-Index") as string
  ).toI32();

  let visrInEthRate = getExchangeRate(Address.fromString(poolAddressVisr), 0);
  let ethInUsdcRate = getExchangeRate(
    Address.fromString(poolAddressUsdc),
    usdcIndex
  );
  let rate = visrInEthRate
    .times(ethInUsdcRate)
    .div(BigDecimal.fromString(USDC_DECIMAL_FACTOR.toString()));

  return rate as BigDecimal;
}

export function getBaseTokenRateInUSDC(hypervisorId: string): BigDecimal {
  let rate = ZERO_BD;
  let conversion = UniswapV3HypervisorConversion.load(hypervisorId);
  if (conversion != null) {
    if (isZero(Address.fromString(conversion.baseToken))) {
      rate = ZERO_BD;
    } else if (isUSDC(Address.fromString(conversion.baseToken))) {
      rate = ONE_BD;
    } else {
      rate = ONE_BD;
      for (let i = 0; i < conversion.usdPath.length; i++) {
        let intermediateRate = getExchangeRate(
          Address.fromString(conversion.usdPath[i]),
          conversion.usdPathIndex[i]
        );
        rate = rate.times(intermediateRate);
      }
    }
  }
  // After conversions the rate will always be in USDC, which has 6 decimals
  return rate.div(BigDecimal.fromString(USDC_DECIMAL_FACTOR.toString()));
}

export function calcTwoTokenUSD(
  hypervisorAddress: Address,
  amount0: BigInt,
  amount1: BigInt
): BigDecimal {
  const hypervisor = getOrCreateHypervisor(hypervisorAddress);
  const conversion = UniswapV3HypervisorConversion.load(
    hypervisor.id
  ) as UniswapV3HypervisorConversion;
  const price = getExchangeRate(
    Address.fromString(hypervisor.pool),
    conversion.baseTokenIndex
  );
  const baseTokenInUSDC = getBaseTokenRateInUSDC(hypervisor.id);

  let amountUSD = ZERO_BD;
  if (conversion.baseTokenIndex == 0) {
    amountUSD = amount1
      .toBigDecimal()
      .times(price)
      .plus(amount0.toBigDecimal())
      .times(baseTokenInUSDC);
  } else if (conversion.baseTokenIndex == 1) {
    amountUSD = amount0
      .toBigDecimal()
      .times(price)
      .plus(amount1.toBigDecimal())
      .times(baseTokenInUSDC);
  }

  return amountUSD;
}

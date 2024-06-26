import { Address, Bytes, log } from "@graphprotocol/graph-ts";
import { UniswapV3Pool } from "../../../generated/schema";
import { AlgebraV1Pool as V1PoolContract } from "../../../generated/templates/Pool/AlgebraV1Pool";
import { AlgebraV2Pool as V2PoolContract } from "../../../generated/templates/Pool/AlgebraV2Pool";
import { AlgebraIntegralPool as IntegralPoolContract } from "../../../generated/templates/Pool/AlgebraIntegralPool";
import { encodeKey } from "../common/positions";
import { createPool } from "../entities";

export function createAlgebraV1Pool(
  poolAddress: Address
): UniswapV3Pool | null {
  const poolContract = V1PoolContract.bind(poolAddress);
  const liquidityCooldown = poolContract.try_liquidityCooldown();

  if (liquidityCooldown.reverted) {
    return null;
  }

  const globalState = poolContract.try_globalState(); // Equivalent to slot0

  if (globalState.reverted) {
    log.warning("{} is not a valid Algebra V1 pool", [poolAddress.toHex()]);
    return null;
  }

  const pool = createPool(
    poolAddress,
    poolContract.token0(),
    poolContract.token1(),
    0,
    globalState.value.getPrice(),
    globalState.value.getTick()
  );

  return pool as UniswapV3Pool;
}

export function createAlgebraV2Pool(
  poolAddress: Address
): UniswapV3Pool | null {
  const poolContract = V2PoolContract.bind(poolAddress);
  const dataStorageOperator =
    poolContract.try_dataStorageOperator();

  if (dataStorageOperator.reverted) {
    return null;
  }

  const globalState = poolContract.try_globalState(); // Equivalent to slot0

  if (globalState.reverted) {
    return null;
  }

  const pool = createPool(
    poolAddress,
    poolContract.token0(),
    poolContract.token1(),
    0,
    globalState.value.getPrice(),
    globalState.value.getTick()
  );

  return pool as UniswapV3Pool;
}

export function createAlgebraIntegralPool(
  poolAddress: Address
): UniswapV3Pool | null {
  const poolContract = IntegralPoolContract.bind(poolAddress);
  const fee = poolContract.try_fee();

  if (fee.reverted) {
    return null;
  }

  const globalState = poolContract.try_globalState(); // Equivalent to slot0

  if (globalState.reverted) {
    return null;
  }

  const pool = createPool(
    poolAddress,
    poolContract.token0(),
    poolContract.token1(),
    0,
    globalState.value.getPrice(),
    globalState.value.getTick()
  );

  return pool as UniswapV3Pool;
}

export function algebraPositionKey(
  ownerAddress: Address,
  tickLower: i32,
  tickUpper: i32
): Bytes {
  const encodedHex = encodeKey(ownerAddress, tickLower, tickUpper).toHex();

  const encodedPacked =
    "0x000000000000" +
    encodedHex.substr(26, 40) +
    encodedHex.substr(124, 6) +
    encodedHex.substr(188, 6);

  const key = Bytes.fromHexString(encodedPacked);

  return key as Bytes;
}

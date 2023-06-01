/* eslint-disable prefer-const */
import { TypedMap } from "@graphprotocol/graph-ts";
import { ADDRESS_ZERO } from "./constants";

class BasePool {
  pathIdx: i32[];
  path: string[];
  priority: i32;
}

export class BaseTokenDefinition {
  static mainnet(): TypedMap<string, BasePool> {
    const WBTC = "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599";
    const WETH = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";
    const DAI = "0x6b175474e89094c44da98b954eedeac495271d0f";
    const USDT = "0xdac17f958d2ee523a2206206994597c13d831ec7";
    const USDC = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48";
    const OHM = "0x64aa3364f17a4d01c6f1751fd97c2bd3d7e7f1d5";
    const OCEAN = "0x967da4048cd07ab37855c090aaf366e4ce1b9f48";

    const WBTC_USDC = "0x99ac8ca7087fa4a2a1fb6357269965a2014abc35";
    const USDC_WETH = "0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640";
    const DAI_USDC = "0x6c6bc977e13df9b0de53b251522280bb72383700";
    const USDC_USDT = "0x7858e59e0c01ea06df3af3d20ac7b0003275d4bf";
    // const OHM_USDC = "0x893f503fac2ee1e5b78665db23f9c94017aae97d"
    const OHM_ETH = "0x584ec2562b937c4ac0452184d8d83346382b5d3a";
    const OCEAN_ETH = "0x283e2e83b7f3e297c4b7c02114ab0196b001a109";

    let lookup = new TypedMap<string, BasePool>();
    lookup.set(USDC, { pathIdx: [-1], path: [ADDRESS_ZERO], priority: 6 });
    lookup.set(USDT, { pathIdx: [0], path: [USDC_USDT], priority: 5 });
    lookup.set(DAI, { pathIdx: [1], path: [DAI_USDC], priority: 4 });
    lookup.set(WETH, { pathIdx: [0], path: [USDC_WETH], priority: 3 });
    lookup.set(WBTC, { pathIdx: [1], path: [WBTC_USDC], priority: 2 });
    lookup.set(OHM, {
      pathIdx: [1, 0],
      path: [OHM_ETH, USDC_WETH],
      priority: 1,
    });
    lookup.set(OCEAN, {
      pathIdx: [1, 0],
      path: [OCEAN_ETH, USDC_WETH],
      priority: 0,
    });

    return lookup as TypedMap<string, BasePool>;
  }

  static polygon(): TypedMap<string, BasePool> {
    const WBTC = "0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6";
    const WETH = "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619";
    const DAI = "0x8f3cf7ad23cd3cadbd9735aff958023239c6a063";
    const USDT = "0xc2132d05d31c914a87c6611c10748aeb04b58e8f";
    const USDC = "0x2791bca1f2de4661ed88a30c99a7a9449aa84174";
    const WMATIC = "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270";
    const MIMATIC = "0xa3fa99a148fa48d14ed51d610c367c61876997f1"; // MAI
    const MATICX = "0xfa68fb4628dff1028cfec22b4162fccd0d45efb6";
    const STMATIC = "0x3a58a54c066fdc0f2d55fc9c89f0415c92ebf3c4";

    const WBTC_USDC = "0x847b64f9d3a95e977d157866447a5c0a5dfa0ee5";
    const USDC_WETH = "0x45dda9cb7c25131df268515131f647d726f50608";
    const DAI_USDC = "0x5f69c2ec01c22843f8273838d570243fd1963014";
    const USDC_USDT = "0x3f5228d0e7d75467366be7de2c31d0d098ba2c23";
    const WMATIC_USDC = "0xa374094527e1673a86de625aa59517c5de346d32";
    const USDC_MIMATIC = "0x7de263d0ad6e5d208844e65118c3a02a9a5d56b6";
    const WMATIC_MATICX = "0x05bfe97bf794a4db69d3059091f064ea0a5e538e";
    const WMATIC_STMATIC = "0x64c01d2b748e5deba661ce58393e6ee0e151a1ee";

    let lookup = new TypedMap<string, BasePool>();
    lookup.set(USDC, { pathIdx: [-1], path: [ADDRESS_ZERO], priority: 8 });
    lookup.set(USDT, { pathIdx: [0], path: [USDC_USDT], priority: 7 });
    lookup.set(DAI, { pathIdx: [0], path: [DAI_USDC], priority: 6 });
    lookup.set(WMATIC, { pathIdx: [1], path: [WMATIC_USDC], priority: 5 });
    lookup.set(WETH, { pathIdx: [0], path: [USDC_WETH], priority: 4 });
    lookup.set(WBTC, { pathIdx: [1], path: [WBTC_USDC], priority: 3 });
    lookup.set(MIMATIC, { pathIdx: [0], path: [USDC_MIMATIC], priority: 2 });
    lookup.set(MATICX, {
      pathIdx: [0, 1],
      path: [WMATIC_MATICX, WMATIC_USDC],
      priority: 1,
    });
    lookup.set(STMATIC, {
      pathIdx: [0, 1],
      path: [WMATIC_STMATIC, WMATIC_USDC],
      priority: 0,
    });

    return lookup as TypedMap<string, BasePool>;
  }

  static arbitrumOne(): TypedMap<string, BasePool> {
    const WBTC = "0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f";
    const WETH = "0x82af49447d8a07e3bd95bd0d56f35241523fbab1";
    const DAI = "0xda10009cbd5d07dd0cecc66161fc93d7c9000da1";
    const USDT = "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9";
    const USDC = "0xff970a61a04b1ca14834a43f5de4533ebddb5cc8";

    const WBTC_USDC = "0xa62ad78825e3a55a77823f00fe0050f567c1e4ee";
    const USDC_WETH = "0x17c14d2c404d167802b16c450d3c99f88f2c4f4d";
    const DAI_USDC = "0xd37af656abf91c7f548fffc0133175b5e4d3d5e6";
    const USDC_USDT = "0x13398e27a21be1218b6900cbedf677571df42a48";

    let lookup = new TypedMap<string, BasePool>();
    lookup.set(USDC, { pathIdx: [-1], path: [ADDRESS_ZERO], priority: 4 });
    lookup.set(USDT, { pathIdx: [1], path: [USDC_USDT], priority: 3 });
    lookup.set(DAI, { pathIdx: [1], path: [DAI_USDC], priority: 2 });
    lookup.set(WETH, { pathIdx: [1], path: [USDC_WETH], priority: 1 });
    lookup.set(WBTC, { pathIdx: [1], path: [WBTC_USDC], priority: 0 });

    return lookup as TypedMap<string, BasePool>;
  }

  static optimism(): TypedMap<string, BasePool> {
    const WBTC = "0x68f180fcce6836688e9084f035309e29bf0a2095";
    const WETH = "0x4200000000000000000000000000000000000006";
    const DAI = "0xda10009cbd5d07dd0cecc66161fc93d7c9000da1";
    const USDT = "0x94b008aa00579c1307b0ef2c499ad98a8ce58e58";
    const USDC = "0x7f5c764cbc14f9669b88837ca1490cca17c31607";
    const alUSD = "0xcb8fa9a76b8e203d8c3797bf438d8fb81ea3326a";
    const WSTETH = "0x1f32b1c2345538c0c6f582fcb022739c4a194ebb";

    const WETH_WBTC = "0x73b14a78a0d396c521f954532d43fd5ffe385216";
    const WETH_USDC = "0x85149247691df622eaf1a8bd0cafd40bc45154a9";
    const USDC_DAI = "0x100bdc1431a9b09c61c0efc5776814285f8fb248";
    const USDC_USDT = "0xf3f3433c3a97f70349c138ada81da4d3554982db";
    const USDC_alUSD = "0xf3ade441be8c0579ca8d0b05ca33ed35dd90338c ";
    const WSTETH_WETH = "0x04f6c85a1b00f6d9b75f91fd23835974cc07e65c";

    let lookup = new TypedMap<string, BasePool>();
    lookup.set(USDC, { pathIdx: [-1], path: [ADDRESS_ZERO], priority: 6 });
    lookup.set(USDT, { pathIdx: [0], path: [USDC_USDT], priority: 5 });
    lookup.set(DAI, { pathIdx: [0], path: [USDC_DAI], priority: 4 });
    lookup.set(WETH, { pathIdx: [1], path: [WETH_USDC], priority: 3 });
    lookup.set(WBTC, {
      pathIdx: [0, 1],
      path: [WETH_WBTC, WETH_USDC],
      priority: 2,
    });
    lookup.set(alUSD, { pathIdx: [0], path: [USDC_alUSD], priority: 1 });
    lookup.set(WSTETH, {
      pathIdx: [1, 1],
      path: [WSTETH_WETH, WETH_USDC],
      priority: 0,
    });

    return lookup as TypedMap<string, BasePool>;
  }

  static celo(): TypedMap<string, BasePool> {
    // const WBTC = "0xbaab46e28388d2779e6e31fd00cf0e5ad95e327b"
    const WETH = "0x66803fb87abd4aac3cbb3fad7c3aa01f6f3fb207";
    // const DAI = ""  No DAI on celo uniswap
    // const USDT = ""  No USDT on celo uniswap
    const USDC = "0x37f750b7cc259a2f741af45294f6a16572cf5cad";
    const CELO = "0x471ece3750da237f93b8e339c536989b8978a438";
    const cUSD = "0x765de816845861e75a25fca122bb6898b8b1282a";

    // const CELO_WBTC = ""
    const CELO_WETH = "0xd88d5f9e6c10e6febc9296a454f6c2589b1e8fae";
    // const DAI_USDC = ""
    // const USDC_USDT = ""
    const CELO_cUSD = "0x079e7a44f42e9cd2442c3b9536244be634e8f888";
    const USDC_cUSD = "0xea3fb6e3313a2a90757e4ca3d6749efd0107b0b6";

    let lookup = new TypedMap<string, BasePool>();
    lookup.set(USDC, { pathIdx: [-1], path: [ADDRESS_ZERO], priority: 6 });
    lookup.set(cUSD, { pathIdx: [0], path: [USDC_cUSD], priority: 5 });
    // lookup.set(USDT, { pool: USDC_USDT, pathIdx: [0], path: [], priority: 4 });
    // lookup.set(DAI, { pool: DAI_USDC, pathIdx: [0], path: [], priority: 3 });
    lookup.set(CELO, {
      pathIdx: [1, 0],
      path: [CELO_cUSD, USDC_cUSD],
      priority: 2,
    });
    lookup.set(WETH, {
      pathIdx: [0, 1, 0],
      path: [CELO_WETH, CELO_cUSD, USDC_cUSD],
      priority: 1,
    });
    // lookup.set(WBTC, { pool: WBTC_USDC, pathIdx: [1], path: [], priority: 0 });

    return lookup as TypedMap<string, BasePool>;
  }

  static bsc(): TypedMap<string, BasePool> {
    const BTCB = "0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c";
    const WETH = "0x2170ed0880ac9a755fd29b2688956bd959f933f8";
    const WBNB = "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c";
    const BUSD = "0xe9e7cea3dedca5984780bafc599bd69add087d56";
    const USDT = "0x55d398326f99059ff775485246999027b3197955";
    const USDC = "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d";
    const ANKRBNB = "0x52f24a5e03aee338da5fd9df68d2b6fae1178827";
    const BNBX = "0x1bdd3cf7f79cfb8edbb955f20ad99211551ba275";
    const FRXETH = "0x64048a7eecf3a2f1ba9e144aac3d7db6e58f555e";
    const FRAX = "0x90c97f71e18723b0cf0dfa30ee176ab653e89f40";
    const DOLA = "0x2f29bc0ffaf9bff337b31cbe6cb5fb3bf12e5840";
    const STKBNB = "0xc2e9d07f66a89c44062459a47a0d2dc038e4fb16";

    const USDT_USDC = "0x2c3c320d49019d4f9a92352e947c7e5acfe47d68";
    const USDT_BUSD = "0x84e47c7f2fe86f6b5efbe14fee46b8bb871b2e05";
    const WBNB_BUSD = "0x32776ed4d96ed069a2d812773f0ad8ad9ef83cf8";
    const WETH_WBNB = "0x4fb87838a29b37598099ef5aa6b3fbeeef987c50";
    const BTCB_WBNB = "0x28df0835942396b7a1b7ae1cd068728e6ddbbafd";
    const ANKRBNB_WBNB = "0x2f6c6e00e517944ee5efe310cd0b98a3fc61cb98";
    const BNBX_WBNB = "0xf2a4e4261fcdfbb891bcf703640fbe713c6cd0fe";
    const HAY_FRXETH = "0xf8a4cdf9efc4b9b38eaa6e27ee281cb2111fa664";
    const HAY_USDT = "0x5b0baf66718caabda49a4af32eb455c3b99b5821";
    const WBNB_STKBNB = "0x84b78452a97c5afda1400943333f691448069a29";
    const USDT_FRAX = "0x8d65dbe7206a768c466073af0ab6d76f9e14fc6d";
    const DOLA_FRAX = "0xfd66a4a4c921cd7194abab38655476a06fbaea05";

    let lookup = new TypedMap<string, BasePool>();
    lookup.set(USDC, { pathIdx: [-1], path: [ADDRESS_ZERO], priority: 12 });
    lookup.set(USDT, { pathIdx: [1], path: [USDT_USDC], priority: 11 });
    lookup.set(BUSD, {
      pathIdx: [0, 1],
      path: [USDT_BUSD, USDT_USDC],
      priority: 10,
    });
    lookup.set(WBNB, {
      pathIdx: [1, 0, 1],
      path: [WBNB_BUSD, USDT_BUSD, USDT_USDC],
      priority: 9,
    });
    lookup.set(WETH, {
      pathIdx: [1, 1, 0, 1],
      path: [WETH_WBNB, WBNB_BUSD, USDT_BUSD, USDT_USDC],
      priority: 8,
    });
    lookup.set(BTCB, {
      pathIdx: [1, 1, 0, 1],
      path: [BTCB_WBNB, WBNB_BUSD, USDT_BUSD, USDT_USDC],
      priority: 7,
    });
    lookup.set(FRAX, {
      pathIdx: [0, 1],
      path: [USDT_FRAX, USDT_USDC],
      priority: 6,
    });
    lookup.set(DOLA, {
      pathIdx: [1, 0, 1],
      path: [DOLA_FRAX, USDT_FRAX, USDT_USDC],
      priority: 5,
    });
    lookup.set(ANKRBNB, {
      pathIdx: [1, 1, 0, 1],
      path: [ANKRBNB_WBNB, WBNB_BUSD, USDT_BUSD, USDT_USDC],
      priority: 4,
    });
    lookup.set(BNBX, {
      pathIdx: [1, 1, 0, 1],
      path: [BNBX_WBNB, WBNB_BUSD, USDT_BUSD, USDT_USDC],
      priority: 3,
    });
    lookup.set(FRXETH, {
      pathIdx: [0, 1, 1],
      path: [HAY_FRXETH, HAY_USDT, USDT_USDC],
      priority: 2,
    });
    lookup.set(STKBNB, {
      pathIdx: [0, 1, 0, 1],
      path: [WBNB_STKBNB, WBNB_BUSD, USDT_BUSD, USDT_USDC],
      priority: 1,
    });

    return lookup as TypedMap<string, BasePool>;
  }

  static polygonZkEvm(): TypedMap<string, BasePool> {
    const WETH = "0x4f9a0e7fd2bf6067db6994cf12e4495df938e6e9";
    const USDT = "0x1e4a5963abfd975d8c9021ce480b42188849d41d";
    const USDC = "0xa8ce8aee21bc2a48a5ef670afcc9274c7bbbc035";

    const WETH_USDC = "0xc44ad482f24fd750caeba387d2726d8653f8c4bb";
    const USDT_USDC = "0x9591b8a30c3a52256ea93e98da49ee43afa136a8";

    let lookup = new TypedMap<string, BasePool>();
    lookup.set(USDC, { pathIdx: [-1], path: [ADDRESS_ZERO], priority: 3 });
    lookup.set(USDT, { pathIdx: [1], path: [USDT_USDC], priority: 2 });
    lookup.set(WETH, { pathIdx: [1], path: [WETH_USDC], priority: 1 });

    return lookup as TypedMap<string, BasePool>;
  }

  static avalanche(): TypedMap<string, BasePool> {
    // const WBTCe = "0x50b7545627a5162f82a992c33b87adc75187b218";
    // const WETHe = "0x49d5c2bdffac6ce2bfdb6640f4f80f226bc10bab";
    // const DAIe = "0xd586e7f844cea2f87f50152665bcbc2c279d8d70";
    const USDT = "0x9702230a8ea53601f5cd2dc00fdbc13d4df4a8c7";
    // const USDTe = "0xc7198437980c041c805a1edcba50c1ce5db95118";
    const USDC = "0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e";
    // const USDCe = "0xa7d7079b0fead91f3e65f86e8915cb59c1a4c664";
    const WAVAX = "0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7";

    // const WBTC_USDC = "";
    // const USDC_WETH = "";
    // const DAI_USDC = "";
    const USDT_USDC = "0x128be8fcffc5ddc5e98d41dab8e0269afc46a0a0";
    const WAVAX_USDC = "0x41404a51fa9b0068a898f6e9b9c3e7e334267b5b";

    let lookup = new TypedMap<string, BasePool>();
    lookup.set(USDC, { pathIdx: [-1], path: [ADDRESS_ZERO], priority: 3 });
    lookup.set(USDT, { pathIdx: [1], path: [USDT_USDC], priority: 2 });
    lookup.set(WAVAX, { pathIdx: [1], path: [WAVAX_USDC], priority: 1 });
    // lookup.set(DAI, { pathIdx: [1], path: [DAI_USDC], priority: 4 });
    // lookup.set(WETH, { pathIdx: [0], path: [USDC_WETH], priority: 3 });
    // lookup.set(WBTC, { pathIdx: [1], path: [WBTC_USDC], priority: 2 });

    return lookup as TypedMap<string, BasePool>;
  }

  static fantom(): TypedMap<string, BasePool> {
    const WBTC = "0x321162cd933e2be498cd2267a90534a804051b11";
    const WETH = "0x74b23882a30290451a17c44f4f05243b6b58c76d";
    const USDT = "0x049d68029688eabf473097a2fc38ef61633a3c7a";
    const USDC = "0x04068da6c83afcfa0e13ba15a6696662335d5b75";
    const WFTM = "0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83";

    // const USDT_USDC = "";

    let lookup = new TypedMap<string, BasePool>();
    lookup.set(USDC, { pathIdx: [-1], path: [ADDRESS_ZERO], priority: 3 });
    // lookup.set(USDT, { pathIdx: [1], path: [USDT_USDC], priority: 2 });

    return lookup as TypedMap<string, BasePool>;
  }

  static moonbeam(): TypedMap<string, BasePool> {
    const WBTC = "0x922d641a426dcffaef11680e5358f34d97d112e1";
    const WETH = "0xab3f0245b83feb11d15aaffefd7ad465a59817ed";
    // const USDT = "0xffffffffea09fb06d082fd1275cd48b191cbcd1d";
    const USDC = "0x931715fee2d06333043d11f658c8ce934ac61d0c";
    const WGLMR = "0xacc15dc74880c9944775448304b263d191c6077f";

    // const USDT_USDC = "";
    const WGLMR_WBTC = "0x416bd9798d5214cae6f837c0a53a73beb3ced465";
    const WETH_WGLMR = "0x7e71d586ad01c0bf7953eb82e7b76c1338b0068c";
    const USDC_WGLMR = "0xab8c35164a8e3ef302d18da953923ea31f0fe393";

    let lookup = new TypedMap<string, BasePool>();
    lookup.set(USDC, { pathIdx: [-1], path: [ADDRESS_ZERO], priority: 4 });
    lookup.set(WGLMR, { pathIdx: [0], path: [USDC_WGLMR], priority: 3 });
    lookup.set(WETH, {
      pathIdx: [1, 0],
      path: [WETH_WGLMR, USDC_WGLMR],
      priority: 2,
    });
    lookup.set(WBTC, {
      pathIdx: [0, 0],
      path: [WGLMR_WBTC, USDC_WGLMR],
      priority: 1,
    });

    return lookup as TypedMap<string, BasePool>;
  }

  static nonBase(): BasePool {
    let lookup: BasePool = {
      path: [ADDRESS_ZERO],
      pathIdx: [-1],
      priority: -1,
    };
    return lookup as BasePool;
  }

  static network(network: string): TypedMap<string, BasePool> {
    let mapping = new TypedMap<string, BasePool>();
    if (network == "mainnet") {
      mapping = this.mainnet();
    } else if (network == "matic") {
      mapping = this.polygon();
    } else if (network == "arbitrum-one") {
      mapping = this.arbitrumOne();
    } else if (network == "optimism") {
      mapping = this.optimism();
    } else if (network == "celo") {
      mapping = this.celo();
    } else if (network == "bsc") {
      mapping = this.bsc();
    } else if (network == "polygon-zkevm") {
      mapping = this.polygonZkEvm();
    } else if (network == "avalanche") {
      mapping = this.avalanche();
    } else if (network == "fantom") {
      mapping = this.fantom();
    } else if (network == "moonbeam") {
      mapping = this.moonbeam();
    }

    return mapping as TypedMap<string, BasePool>;
  }
}
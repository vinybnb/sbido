const { ethers, upgrades } = require("hardhat");

async function main() {
  const LunaFarmPrivateSale = await ethers.getContractFactory("LunaFarmPrivateSale");
  /// Deploy
  const proxy = await upgrades.deployProxy(LunaFarmPrivateSale, [
    "0x928d5fCCD154cCD79936FA10feF360b5AD60c383",
  ]);
  const proxyResult = await proxy.deployed();

  await proxyResult.setEnabled(true);
  await proxyResult.setClaimEnabled(true);
  await proxyResult.setInstantReleaseWithPercent("10000");

  console.log(
    "Success when deploy LunaFarmPrivateSale contract: %s",
    proxyResult.address
  );
  // Upgrade
  //   const PRESALE_ADDRESS = "0x4367f170B3853C32af33D02d16551328Ec1693B0";
  //   const newProxy = await upgrades.upgradeProxy(PRESALE_ADDRESS, Presale);
  //   console.log("Presale upgraded");

  // npx hardhat verify --network testnet 0x65a39e9cfd2dD335eC1137E0B2CaF81dF4fD6F27
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
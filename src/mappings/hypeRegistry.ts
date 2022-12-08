/* eslint-disable prefer-const */
import { log } from "@graphprotocol/graph-ts";
import { HypeAdded } from "../../generated/HypeRegistry/HypeRegistry";
import { Hypervisor as HypervisorContract } from "../../generated/templates/Hypervisor/Hypervisor";
import { Hypervisor as HypervisorTemplate } from "../../generated/templates";
import { getOrCreateHypervisor } from "../utils/uniswapV3/hypervisor";
import { UniswapV3Hypervisor } from "../../generated/schema";
import { getOrCreateProtocol } from "../utils/entities";


export function handleHypeAdded(event: HypeAdded): void {
  let hypervisor = UniswapV3Hypervisor.load(event.params.hype.toHex());
  if (hypervisor) {
    return;  // No need to add if hype was already added manually as orphan.
  }

  let hypervisorContract = HypervisorContract.bind(event.params.hype);
  let test_amount = hypervisorContract.try_getTotalAmounts();
  if (test_amount.reverted) {
    log.warning("Could not add {}, does not appear to be a hypervisor", [
      event.params.hype.toHex(),
    ]);
    return;
  }

  getOrCreateProtocol()
  
  hypervisor = getOrCreateHypervisor(event.params.hype, event.block.timestamp);
  hypervisor.save();

  HypervisorTemplate.create(event.params.hype);
}

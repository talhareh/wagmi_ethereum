import tokenAbi from "./tokenAbi.json";
import presaleAbi from "./presaleAbi.json";
import usdtAbi from "./usdtAbi.json";
import { tokenAddress, presaleAddress, usdtAddress } from "./environment";
import { readContract, writeContract } from "wagmi/actions";
import { waitForTransaction } from "@wagmi/core";

// const chainId = 97;

export const tokenReadFunction = async (functionName, args) => {
  const data = await readContract({
    address: tokenAddress,
    abi: tokenAbi,
    functionName,
    args,
  });
  return data;
};

export const usdtReadFunction = async (functionName, args) => {
  const data = await readContract({
    address: usdtAddress,
    abi: usdtAbi,
    functionName,
    args,
  });
  return data;
};

export const presaleReadFunction = async (functionName, args) => {
  const data = await readContract({
    address: presaleAddress,
    abi: presaleAbi,
    functionName,
    args,
  });
  return data;
};

export const fetchMetrics = async () => {
  try {
    const response = await fetch('http://app.bitcoinfansclub.com/metrics');
    if (!response.ok) {
      console.log('Not OK res')
      return [{ usr_raised: 0, views_taken: 0, average: 0.000, usr_target:0 }];
    }
    const data = await response.json();
    
    const decodedMetrics = data.map(row => ({
      usr_raised: parseFloat(atob(row.usr_raised)),
      views_taken: parseFloat(atob(row.views_taken)),
      average: parseFloat(atob(row.average)),
      usr_target: parseFloat(atob(row.usr_target))
    }));
    return decodedMetrics
  } catch (error) {
    console.error('Error fetching metrics:', error);
  }
}

/// write functions
export const tokenWriteFunction = async (functionName, args) => {
  const { hash } = await writeContract({
    address: tokenAddress,
    abi: tokenAbi,
    functionName,
    args,
  });
  const receipt = await waitForTransaction({ hash });
  return receipt;
};

export const usdtWriteFunction = async (functionName, args) => {
  const { hash } = await writeContract({
    address: usdtAddress,
    abi: usdtAbi,
    functionName,
    args,
  });
  const receipt = await waitForTransaction({ hash });
  return receipt;
};

export const presaleWriteFunction = async (functionName, args, value) => {
  const { hash } = await writeContract({
    address: presaleAddress,
    abi: presaleAbi,
    functionName,
    args,
    value,
  });
  const receipt = await waitForTransaction({ hash });
  return receipt;
};

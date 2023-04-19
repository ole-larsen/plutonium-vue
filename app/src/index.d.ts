declare global {
  interface Window {
    ethereum: import("ethers").providers.ExternalProvider;
  }
}
// must exist to compile
export {};
import { PayFeesIn } from "./constants";

export const getPayFeesIn = (payFeesIn: string) => {
  let fees;

  switch (payFeesIn) {
      case "Native":
          fees = PayFeesIn.Native;
          break;
      case "native":
          fees = PayFeesIn.Native;
          break;
      case "LINK":
          fees = PayFeesIn.LINK;
          break;
      case "link":
          fees = PayFeesIn.LINK;
          break;
      default:
          fees = PayFeesIn.Native;
          break;
  }

  return fees;
}
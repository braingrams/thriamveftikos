export default function getActualAmount(amount: number, fee: number) {
  const newFees = fee + (1 / 3.25) * fee;
  return Math.ceil((amount - newFees) / 100);
}

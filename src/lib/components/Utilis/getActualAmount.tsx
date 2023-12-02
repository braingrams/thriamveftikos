export default function getActualAmount(amount: number, fee: number) {
  const newFees = fee + (1 / 3) * fee;
  return (amount - newFees) / 100;
}

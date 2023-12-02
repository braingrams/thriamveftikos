export default function getActualAmount(amount: number, fee: number) {
  const newFees = Math.ceil(fee + (1 / 3.25) * fee);
  return (amount - newFees) / 100;
}

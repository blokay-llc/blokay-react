export const money = (n: string) => {
  const Currency = {
    decimals: 0,
    prefix: "$",
    suffix: "",
    thousands: ",",
    decimal: ".",
  };

  const c = Currency.decimals,
    d = Currency.decimal,
    t = Currency.thousands,
    s = +n < 0 ? "-" : "",
    i = String(parseInt((n = Math.abs(Number(n) || 0).toFixed(c))));

  let j = i.length;

  j = j > 3 ? j % 3 : 0;
  const formattedVal =
    s +
    (j ? i.substring(0, j) + t : "") +
    i.substring(j).replace(/(\d{3})(?=\d)/g, `$1${t}`) +
    (c
      ? d +
        Math.abs(+n - parseInt(i))
          .toFixed(c)
          .slice(2)
      : "");

  return Currency.prefix + formattedVal + Currency.suffix;
};

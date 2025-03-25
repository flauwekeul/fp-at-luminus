import * as R from 'remeda';

/**
 * 🧑‍💻 Refactor the code below to use Remeda. Keep the tests passing.
 *
 * 💡 Hint: use `R.groupBy`
 */

type Contract = {
  id: string;
  promotions?: Promotion[];
};

type PromotionType = 'discount' | 'free-shipping';

type Promotion = {
  type: PromotionType;
  amount: number;
};

function getContractPromotionsByType(contracts: Contract[]): Record<PromotionType, Promotion[]> {
  // 👇👇👇 Only change code BELOW 👇👇👇
  return (
    contracts
      // Collect all promotions or an empty array
      .flatMap((contract) => contract.promotions ?? [])
      // Group promotions by type
      .reduce<Record<string, Promotion[]>>((acc, promotion) => {
        if (Array.isArray(acc[promotion.type])) {
          acc[promotion.type]!.push(promotion);
        } else {
          acc[promotion.type] = [promotion];
        }
        return acc;
      }, {})
  );
  // 👆👆👆 Only change code ABOVE 👆👆👆
}

// Tests:

if (import.meta.vitest) {
  const contracts: Contract[] = [
    { id: '1', promotions: [{ type: 'discount', amount: 10 }] },
    { id: '2', promotions: [{ type: 'discount', amount: 20 }] },
    {
      id: '3',
      promotions: [
        { type: 'free-shipping', amount: 5 },
        { type: 'discount', amount: 30 },
      ],
    },
    { id: '4' },
  ];

  test('returns promotions by type', () => {
    const expected = {
      discount: [
        { type: 'discount', amount: 10 },
        { type: 'discount', amount: 20 },
        { type: 'discount', amount: 30 },
      ],
      'free-shipping': [{ type: 'free-shipping', amount: 5 }],
    };

    expect(getContractPromotionsByType(contracts)).toEqual(expected);
  });
}

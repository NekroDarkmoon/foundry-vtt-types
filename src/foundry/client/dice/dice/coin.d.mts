import type { InexactPartial } from "../../../../types/utils.d.mts";

export {};

declare global {
  /**
   * A type of DiceTerm used to represent flipping a two-sided coin.
   */
  class Coin extends DiceTerm {
    constructor(termData?: InexactPartial<Coin.TermData>);

    faces: 2;

    /**
     * @defaultValue `c`
     */
    static DENOMINATION: string;

    /**
     * @defaultValue
     * ```typescript
     *  {
     *    c: "call"
     *  }
     * ```
     */
    static MODIFIERS: Coin.Modifiers;

    override roll(options?: { maximize: boolean; minimize: boolean }): DiceTerm.Result;

    override getResultLabel(result: DiceTerm.Result): string;

    override getResultCSS(result: DiceTerm.Result): (string | null)[];

    /**
     * Call the result of the coin flip, marking any coins that matched the called target as a success
     *
     * 3dcc1      Flip 3 coins and treat "heads" as successes
     * 2dcc0      Flip 2 coins and treat "tails" as successes
     *
     * @param modifier - The matched modifier query
     */
    call(modifier: string): string;
  }

  namespace Coin {
    interface TermData extends DiceTerm.TermData {
      modifiers: Array<keyof Modifiers>;
    }

    interface Modifiers {
      c: "call";
    }
  }
}

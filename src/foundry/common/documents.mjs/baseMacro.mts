import type { Merge } from "../../../types/utils.mts";
import type { DocumentMetadata, DocumentModificationOptions } from "../abstract/document.mts";
import type { Document } from "../abstract/module.mts";
import type * as CONST from "../constants.mts";
import type * as data from "../data/data.mjs/index.mts";
import type { MacroDataConstructorData } from "../data/data.mjs/macroData.mts";
import type { BaseUser } from "./baseUser.mts";

type MacroMetadata = Merge<
  DocumentMetadata,
  {
    name: "Macro";
    collection: "macros";
    label: "DOCUMENT.Macro";
    labelPlural: "DOCUMENT.Macros";
    isPrimary: true;
    types: [typeof CONST.MACRO_TYPES.SCRIPT, typeof CONST.MACRO_TYPES.CHAT];
    permissions: {
      create: "PLAYER";
    };
  }
>;

/**
 * The base Macro model definition which defines common behavior of an Macro document between both client and server.
 */
export declare class BaseMacro extends Document<data.MacroData, null, MacroMetadata> {
  static override get schema(): typeof data.MacroData;

  static override get metadata(): MacroMetadata;

  protected override _preCreate(
    data: MacroDataConstructorData,
    options: DocumentModificationOptions,
    user: BaseUser,
  ): Promise<void>;

  override testUserPermission(
    user: BaseUser,
    permission: keyof typeof foundry.CONST.DOCUMENT_OWNERSHIP_LEVELS | foundry.CONST.DOCUMENT_OWNERSHIP_LEVELS,
    { exact }: { exact?: boolean },
  ): boolean;
}

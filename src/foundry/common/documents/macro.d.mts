// FOUNDRY_VERSION: 10.291

import type { InexactPartial, Merge } from "../../../types/utils.mts";
import type Document from "../abstract/document.mts";
import type { DocumentMetadata, DocumentModificationOptions } from "../abstract/document.mts";
import * as CONST from "../constants.mts";
import * as fields from "../data/fields.mts";
import * as documents from "./module.mts";

declare global {
  type MacroData = BaseMacro.Properties;
}

/**
 * The Document definition for a Macro.
 * Defines the DataSchema and common behaviors for a Macro which are shared between both client and server.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface BaseMacro extends BaseMacro.Properties {}
declare class BaseMacro extends Document<BaseMacro.SchemaField, BaseMacro.Metadata> {
  /**
   * @param data    - Initial data from which to construct the Macro
   * @param context - Construction context options
   */
  constructor(data: BaseMacro.ConstructorData, context?: DocumentConstructionContext);

  static override metadata: Readonly<BaseMacro.Metadata>;

  static override defineSchema(): BaseMacro.Schema;

  /**
   * The default icon used for newly created Macro documents.
   */
  static DEFAULT_ICON: "icons/svg/dice-target.svg";

  override testUserPermission(
    user: documents.BaseUser,
    permission: keyof typeof CONST.DOCUMENT_OWNERSHIP_LEVELS | CONST.DOCUMENT_OWNERSHIP_LEVELS,
    options?: InexactPartial<{
      /**
       * Require the exact permission level requested?
       * @defaultValue `false`
       */
      exact: boolean;
    }>,
  ): boolean;

  protected override _preCreate(
    data: BaseMacro.Properties,
    options: DocumentModificationOptions,
    user: foundry.documents.BaseUser,
  ): Promise<void>;

  static override migrateData(source: object): object;

  static override shimData(
    data: object,
    {
      embedded,
    }?: {
      /**
       * Apply shims to embedded models?
       * @defaultValue `true`
       */
      embedded?: boolean;
    },
  ): object;
}
export default BaseMacro;

declare namespace BaseMacro {
  type Metadata = Merge<
    DocumentMetadata,
    {
      name: "Macro";
      collection: "macros";
      indexed: true;
      compendiumIndexFields: ["_id", "name", "img", "sort", "folder"];
      label: "DOCUMENT.Macro";
      labelPlural: "DOCUMENT.Macros";
      coreTypes: CONST.MACRO_TYPES[];
      permissions: { create: "PLAYER" };
    }
  >;

  type SchemaField = fields.SchemaField<Schema>;
  type ConstructorData = UpdateData & Required<Pick<UpdateData, "name">>;
  type UpdateData = fields.SchemaField.InnerAssignmentType<Schema>;
  type Properties = fields.SchemaField.InnerInitializedType<Schema>;
  type Source = fields.SchemaField.InnerPersistedType<Schema>;

  interface Schema extends DataSchema {
    /**
     * The _id which uniquely identifies this Macro document
     * @defaultValue `null`
     */
    _id: fields.DocumentIdField;

    /**
     * The name of this Macro
     * @defaultValue `""`
     */
    name: fields.StringField<{
      required: true;
      blank: false;
      label: "Name";
      textSearch: true;
    }>;

    /**
     * A Macro subtype from CONST.MACRO_TYPES
     * @defaultValue `CONST.MACRO_TYPES.CHAT`
     */
    type: fields.StringField<{
      required: true;
      choices: CONST.MACRO_TYPES[];
      initial: typeof CONST.MACRO_TYPES.CHAT;
      validationError: "must be a value in CONST.MACRO_TYPES";
      label: "Type";
    }>;

    /**
     * The _id of a User document which created this Macro *
     * @defaultValue `game?.user?.id`
     */
    author: fields.ForeignDocumentField<documents.BaseUser, { initial: () => string }>;

    /**
     * An image file path which provides the thumbnail artwork for this Macro
     * @defaultValue `BaseMacro.DEFAULT_ICON`
     */
    img: fields.FilePathField<{
      categories: ["IMAGE"];
      initial: () => typeof BaseMacro.DEFAULT_ICON;
      label: "Image";
    }>;

    /**
     * The scope of this Macro application from CONST.MACRO_SCOPES
     * @defaultValue `"global"`
     */
    scope: fields.StringField<{
      required: true;
      choices: CONST.MACRO_SCOPES[];
      initial: (typeof CONST.MACRO_SCOPES)[0];
      validationError: "must be a value in CONST.MACRO_SCOPES";
      label: "Scope";
    }>;

    /**
     * The string content of the macro command
     * @defaultValue `""`
     */
    command: fields.StringField<{
      required: true;
      blank: true;
      label: "Command";
    }>;

    /**
     * The _id of a Folder which contains this Macro
     * @defaultValue `null`
     */
    folder: fields.ForeignDocumentField<documents.BaseFolder>;

    /**
     * The numeric sort value which orders this Macro relative to its siblings
     * @defaultValue `0`
     */
    sort: fields.IntegerSortField;

    /**
     * An object which configures ownership of this Macro
     * @defaultValue see {@link fields.DocumentOwnershipField}
     */
    ownership: fields.DocumentOwnershipField;

    /**
     * An object of optional key/value flags
     * @defaultValue `{}`
     */
    flags: fields.ObjectField.FlagsField<"Macro">;

    /**
     * An object of creation and access information
     * @defaultValue see {@link fields.DocumentStatsField}
     */
    _stats: fields.DocumentStatsField;
  }
}

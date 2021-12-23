import { PropertiesToSource } from '../../../../types/helperTypes';
import { DocumentData } from '../../abstract/module.mjs';
import * as CONST from '../../constants.mjs';
import { BaseActiveEffect } from '../../documents.mjs';
import * as fields from '../fields.mjs';

interface EffectChangeDataSchema extends DocumentSchema {
  key: fields.BlankString;
  value: fields.BlankString;
  mode: DocumentField<number> & {
    type: typeof Number;
    required: true;
    default: typeof CONST.ACTIVE_EFFECT_MODES.ADD;
    validate: (m: unknown) => boolean;
    validationError: 'Invalid mode specified for change in ActiveEffectData';
  };
  priority: fields.NumericField;
}

interface EffectChangeDataProperties {
  /**
   * The attribute path in the Actor or Item data which the change modifies
   * @defaultValue `""`
   */
  key: string;

  /**
   * The value of the change effect
   * @defaultValue `""`
   */
  value: string;

  /**
   * The modification mode with which the change is applied
   * @defaultValue `CONST.ACTIVE_EFFECT_MODES.ADD`
   */
  mode: CONST.ACTIVE_EFFECT_MODES;

  /**
   * The priority level with which this change is applied
   */
  priority: number | null | undefined;
}

interface EffectChangeDataConstructorData {
  /**
   * The attribute path in the Actor or Item data which the change modifies
   * @defaultValue `""`
   */
  key?: string | null | undefined;

  /**
   * The value of the change effect
   * @defaultValue `""`
   */
  value?: string | null | undefined;

  /**
   * The modification mode with which the change is applied
   * @defaultValue `CONST.ACTIVE_EFFECT_MODES.ADD`
   */
  mode?: CONST.ACTIVE_EFFECT_MODES | null | undefined;

  /**
   * The priority level with which this change is applied
   */
  priority?: number | null | undefined;
}

/**
 * An embedded data structure which defines the structure of a change applied by an ActiveEffect.
 * @see ActiveEffectData
 */
export class EffectChangeData extends DocumentData<
  EffectChangeDataSchema,
  EffectChangeDataProperties,
  PropertiesToSource<EffectChangeDataProperties>,
  EffectChangeDataConstructorData,
  BaseActiveEffect
> {
  /** @override */
  static defineSchema(): EffectChangeDataSchema;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface EffectChangeData extends EffectChangeDataProperties {}

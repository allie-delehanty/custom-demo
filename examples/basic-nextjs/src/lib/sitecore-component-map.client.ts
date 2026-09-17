'use client';

import generated from '.sitecore/component-map.client';
import { withHeadlessVariantFieldNames } from './headless-variant-field-names';

const componentMap = withHeadlessVariantFieldNames(generated);

export default componentMap;

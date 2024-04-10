import type {ListboxItemProps, ListboxSectionProps} from "@tw-material/listbox";
import type {MenuTriggerAction as BaseMenuTriggerAction} from "@react-types/combobox";

import {ListboxItem, ListboxSection} from "@tw-material/listbox";

import Autocomplete from "./autocomplete";

// export types
export type {AutocompleteProps} from "./autocomplete";
export type {ListboxItemProps as AutocompleteItemProps};
export type {ListboxSectionProps as AutocompleteSectionProps};
export type MenuTriggerAction = BaseMenuTriggerAction | undefined;

// export hooks
export {useAutocomplete} from "./use-autocomplete";

// export components
export {Autocomplete, ListboxItem as AutocompleteItem, ListboxSection as AutocompleteSection};

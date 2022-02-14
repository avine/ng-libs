import { FORM_STEPPER_URL_PATH_SEP } from './form-stepper.config';

export const concatUrlPaths = (...paths: string[]) => paths.join(FORM_STEPPER_URL_PATH_SEP);

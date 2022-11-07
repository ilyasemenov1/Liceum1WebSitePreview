import { Main } from "./modules/projectMetods.js";
import { isWebp } from "./modules/isWebpSupport.js";

isWebp();

let some_aria = new Main([4.17, 5, 4.6, 4.5, 4.05, 4.17, 4, 2.75, 4, 5, 4, 5]);
some_aria.calc();
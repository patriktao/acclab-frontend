import * as RawMaterial from "./rawMaterial";
import * as Dashboard from "./dashboard";
import * as Statistics from "./statistics";
import * as Brands from "./brands";
import * as Locations from "./locations";
import * as Authentication from "./authentication";
import * as MaterialForms from "./materialForms";
import * as Sfp from "./sfp";

export class API {
  static rawMaterial = RawMaterial;
  static dashboard = Dashboard;
  static statistics = Statistics;
  static brands = Brands;
  static locations = Locations;
  static authentication = Authentication;
  static materialforms = MaterialForms;
  static sfp = Sfp;
}

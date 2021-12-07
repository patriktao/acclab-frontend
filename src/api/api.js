import * as RawMaterial from "./rawMaterial";
import * as Dashboard from "./dashboard";
import * as Statistics from "./statistics";
import * as Brands from "./brands";
import * as Locations from "./locations";
import * as Authentication from "./authentication";

export class API {
  static rawMaterial = RawMaterial;
  static dashboard = Dashboard;
  static statistics = Statistics;
  static brands = Brands;
  static locations = Locations;
  static authentication = Authentication;
}

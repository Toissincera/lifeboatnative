import { AuthMock } from "../mock";
import { AuthApi } from "../apis/auth.api";
import { StatsMock } from "../mock/stats.mock";
import { StatsService } from "./stats.service";
import { caseMock } from "../mock/case.mock";
import { caseAPI } from "../apis/case.api";
import { CountryMock } from "../mock/country.mock";
import { CountryAPI } from "../apis/country.api";
import { StateMock } from "../mock/state.mock";
import { StateAPI } from "../apis/state.api";
import { CityMock } from "../mock/city.mock";
import { CityAPI } from "../apis/city.api";
import { memberMock } from "../mock/member.mock";
import { memberAPI } from "../apis/member.api";
import { StatsAPI } from "../apis/stats.api";

const mockConfig = {
  auth: false,
  stats: false,
  case: false,
  member: false,
  country: false,
  state: false,
  city: false,
};

export const DAL_CONFIG = {
  auth: mockConfig.auth ? AuthMock : AuthApi,
  stats: mockConfig.stats ? StatsMock : StatsAPI,
  case: mockConfig.case ? caseMock : caseAPI,
  member: mockConfig.member ? memberMock : memberAPI,
  country: mockConfig.country ? CountryMock : CountryAPI,
  state: mockConfig.state ? StateMock : StateAPI,
  city: mockConfig.city ? CityMock : CityAPI,
};

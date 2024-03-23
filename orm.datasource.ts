import ORMConfig from "ormconfig";
import { DataSource, DataSourceOptions } from "typeorm";

export const dataSource = new DataSource(ORMConfig as DataSourceOptions);
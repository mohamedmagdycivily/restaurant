import { typeOrmConfig } from "./ormconfig";
import { DataSource } from "typeorm";
const dataSource = new DataSource(typeOrmConfig()); // config is one that is defined in datasource.config.ts file
dataSource.initialize();
 export default dataSource; 
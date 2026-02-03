"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Requests extends Model {
    static associate(models) {
      // define association here
    }
  }
  Requests.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      rule: DataTypes.STRING,
      billions: DataTypes.FLOAT,
      rangeInit: DataTypes.FLOAT,
      rangeEnd: DataTypes.FLOAT,
      html: DataTypes.TEXT,
      respondedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "requests",
    },
  );
  return Requests;
};

import { DataTypes } from "sequelize";
import bcrypt from "bcrypt";

module.exports = (sequelize:any) => {
  const Auths = sequelize.define(
    "auths",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            args: true,
            msg: "Ingresa un email valido",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          check: (value:any) => {
            // const hasUppercase = /[A-Z]/.test(value);
            const hasSign = /[@$!%*#?&.]/.test(value);
            if (!hasSign) {
              throw new Error(
                "La contraseña debe tener al menos una letra mayúscula y un signo"
              );
            }
          },
        },
      },
      rol: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Usuario",
        validate:{
          customValidator:(value:any)=>{
            const enums= ["Usuario","Admin"]
            if (!enums.includes(value)) { // Use Array.includes() to validate.
            throw new Error('not a valid option')
          }
        }
      },
    },
      isBanned: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      hooks: {
        beforeCreate: async (auth:any) => {
          const salt = await bcrypt.genSalt(10);
          auth.password = await bcrypt.hash(auth.password, salt);
        },
        beforeUpdate: async (auth:any) => {
          if (auth.changed("password")) {
            const salt = await bcrypt.genSalt(10);
            auth.password = await bcrypt.hash(auth.password, salt);
          }
        },
      },
      timestamps: true,
    }
  );

  Auths.prototype.comparePassword = async function (candidatePassword:any) {
    console.log(this.password)
    return await bcrypt.compare(candidatePassword, this.password);
  };

  return Auths;
};

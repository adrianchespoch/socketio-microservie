import mongoose from 'mongoose';

const planificadorSchema = new mongoose.Schema(
  {
    // en el ERP se gestiona el estado para saber si se puede planificar o no segun estado_flota
    flota: {
      type: mongoose.Schema.Types.UUID,
      required: true,
    },
    fecha: {
      type: Date,
      required: true,
    },
    hora: {
      // one hour slot
      type: Number,
      required: true,
    },
    planificador_state: {
      type: String,
      enum: ['EN_RUTA', 'INSTALANDO', 'FINALIZADO'],
      required: false,
    },
    // TEMP BLOCK - timestamp - 10 min
    limitDate: {
      type: Date,
      required: false,
    },

    // ventas flow
    preventa: {
      type: mongoose.Schema.Types.UUID,
      required: false,
    },
    preagendamiento: {
      type: mongoose.Schema.Types.UUID,
      required: false, // nullable
    },

    // trazabilidad
    trazabilidad: [
      {
        estado: {
          type: String,
          enum: ['EN_RUTA', 'INSTALANDO', 'FINALIZADO'],
          required: true,
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// unique index to handle only one planificador per flota, fecha, hora
planificadorSchema.index({ flota: 1, fecha: 1, hora: 1 }, { unique: true });

export const PlanificadorModel = mongoose.model(
  'Planificador',
  planificadorSchema
);

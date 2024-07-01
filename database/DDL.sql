-- DROP DATABASE tepaseo;

-- DROP TABLE IF EXISTS usuario CASCADE;
-- DROP TABLE IF EXISTS mascota CASCADE;
-- DROP TABLE IF EXISTS paseador CASCADE;
-- DROP TABLE IF EXISTS reserva CASCADE;

-- DROP TRIGGER IF EXISTS actualizar_usuario_updated_at ON usuario;
-- DROP TRIGGER IF EXISTS actualizar_mascota_updated_at ON mascota;
-- DROP TRIGGER IF EXISTS actualizar_paseador_updated_at ON paseador;
-- DROP TRIGGER IF EXISTS actualizar_reserva_updated_at ON reserva;

-- DROP FUNCTION IF EXISTS actualizar_updated_at;

CREATE DATABASE tepaseo;

\c tepaseo;

CREATE TABLE IF NOT EXISTS usuario (
  id            SERIAL,
  nombre        VARCHAR(100)      NOT NULL,
  email         VARCHAR(100)      NOT NULL    UNIQUE,
  pass          VARCHAR(255)      NOT NULL,
  telefono      VARCHAR(20)       NULL,
  direccion     VARCHAR(255)      NULL,
  rol           VARCHAR(50)       NOT NULL,
  created_at    TIMESTAMP         NOT NULL    DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP         NOT NULL    DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS mascota (
  id            SERIAL,
  usuario_id    INTEGER           NOT NULL,
  nombre        VARCHAR(100)      NOT NULL,
  raza          VARCHAR(50)       NULL,
  edad          INTEGER           NULL,
  peso          DECIMAL(5, 2)     NULL,
  genero        VARCHAR(15)       NULL,
  created_at    TIMESTAMP         NOT NULL    DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP         NOT NULL    DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(id),
  CONSTRAINT fk_mascota_usuario FOREIGN KEY(usuario_id) REFERENCES usuario(id)
);

CREATE TABLE IF NOT EXISTS paseador (
  id            SERIAL,
  usuario_id    INTEGER           NOT NULL,
  experiencia   INTEGER           NOT NULL,
  preferencias  VARCHAR(500)      NULL,
  created_at    TIMESTAMP         NOT NULL    DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP         NOT NULL    DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(id),
  CONSTRAINT fk_paseador_usuario FOREIGN KEY(usuario_id) REFERENCES usuario(id)
);

CREATE TABLE IF NOT EXISTS reserva (
  id            SERIAL,
  usuario_id    INTEGER           NOT NULL,
  paseador_id   INTEGER           NOT NULL,
  mascotas_id   INTEGER           NOT NULL,
  fecha_reserva TIMESTAMP         NOT NULL,
  estado        VARCHAR(50)       NOT NULL,
  created_at    TIMESTAMP         NOT NULL    DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP         NOT NULL    DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(id),
  CONSTRAINT fk_reserva_usuario FOREIGN KEY(usuario_id) REFERENCES usuario(id),
  CONSTRAINT fk_reserva_paseador FOREIGN KEY(paseador_id) REFERENCES paseador(id),
  CONSTRAINT fk_reserva_mascota FOREIGN KEY(mascotas_id) REFERENCES mascota(id)
);

CREATE OR REPLACE FUNCTION actualizar_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER actualizar_usuario_updated_at
BEFORE UPDATE ON usuario
FOR EACH ROW
EXECUTE FUNCTION actualizar_updated_at();

CREATE TRIGGER actualizar_mascota_updated_at
BEFORE UPDATE ON mascota
FOR EACH ROW
EXECUTE FUNCTION actualizar_updated_at();

CREATE TRIGGER actualizar_paseador_updated_at
BEFORE UPDATE ON paseador
FOR EACH ROW
EXECUTE FUNCTION actualizar_updated_at();

CREATE TRIGGER actualizar_reserva_updated_at
BEFORE UPDATE ON reserva
FOR EACH ROW
EXECUTE FUNCTION actualizar_updated_at();

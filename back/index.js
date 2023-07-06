const express = require("express");
const multer = require("multer");
const { Storage } = require('@google-cloud/storage');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const allowCorsHandler = (req, res, next) => {
  const whitelist = ['https://ide-front.vercel.app', 'https://stage-dun.vercel.app', 'https://vercel.com', 'http://localhost:3000'];
  const origin = req.headers.origin;
  if (whitelist.indexOf(origin) !== -1) {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }
    next();
  } else {
    return res.status(403).json({ error: 'Non' });
  }
};
const closeSequelizeConnection = (req, res, next) => {
  res.once('finish', () => {
    sequelize.close()
      .then(() => console.log('Sequelize connection closed.'))
      .catch(error => console.error('Failed to close Sequelize connection:', error));
  });

  next();
};
app.use(allowCorsHandler);
app.use(closeSequelizeConnection);
const port = 4444;
const firebaseConfig = {
    type: process.env.TYPE,
    project_id: process.env.PROJECT_ID,
    private_key_id: process.env.PRIVATE_KEY_ID,
    private_key: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.CLIENT_EMAIL,
    client_id: process.env.CLIENT_ID,
    auth_uri: process.env.AUTH_URI,
    token_uri: process.env.TOKEN_URI,
    auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.CLIENT_X509_CERT_URL
};
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('sql7630695', 'sql7630695', process.env.PASSWORD, {
  host: process.env.LINK,
  dialect: 'mysql' /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */,
  dialectModule: require('mysql2'),
});
try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

app.get("/", function (req, res) {
  res.send("Hello World!");
});

sequelize.sync()
  .then(() => {
    console.log('Models synchronized with database.');
    // Démarrage du serveur une fois que la synchronisation est terminée
    app.listen(port, () => {
      console.log(`App listening on port ${port}!`);
    });
  })
  .catch(error => {
    console.error('Failed to synchronize models with database:', error);
  });

var initModels = require("./models/init-models");
var models = initModels(sequelize);

// CRUD patient
app.use(bodyParser.urlencoded({ extended: true }));
app.post("/patient/insert", jsonParser, async (req, res) => {
  try {
    const result = await models.patient.create({
      nom: req.body.nom,
      prenom: req.body.prenom,
      tel: req.body.tel,
      adresse: req.body.adresse,
      medecin: req.body.medecin,
      tel_proche: req.body.tel_proche
    });
    res.json(result);
  } catch (error) {
    res.send(JSON.stringify(error.message));
  }
});

app.get("/patient/list", async (req, res) => {
  try {
    const patients = await models.patient.findAll({});
    res.send(patients);
  } catch (error) {
    res.send(JSON.stringify(error.message));
  }
});

app.post("/patient/update", jsonParser, async (req, res) => {
  try {
    const result = await models.patient.update(
      {
        nom: req.body.nom,
        prenom: req.body.prenom,
        tel: req.body.tel,
        adresse: req.body.adresse,
        medecin: req.body.medecin,
        tel_proche: req.body.tel_proche
      },
      {
        where: {
          id: req.body.id
        }
      }
    );
    res.json(result);
  } catch (error) {
    res.send(JSON.stringify(error.message));
  }
});

app.post("/patient/delete", jsonParser, async (req, res) => {
  try {
    const result = await models.patient.destroy({
      where: {
        id: req.body.id
      }
    });
    res.json(result);
  } catch (error) {
    res.send(JSON.stringify(error.message));
  }
});
// CRUD traitement
app.use(bodyParser.urlencoded({ extended: true }));
app.post("/traitement/insert", jsonParser, async (req, res) => {
  try {
    const result = await models.traitement.create({
      id_patient: req.body.id_patient,
      medicament: req.body.medicament,
      dose_midi: req.body.dose_midi,
      dose_soir: req.body.dose_soir,
      dose_matin: req.body.dose_matin,
      date_debut: req.body.date_debut,
      date_fin: req.body.date_fin
    });
    res.json(result);
  } catch (error) {
    res.send(JSON.stringify(error.message));
  }
});

app.get("/traitement/list", async (req, res) => {
  try {
    const traitements = await models.traitement.findAll({});
    res.send(traitements);
  } catch (error) {
    res.send(JSON.stringify(error.message));
  }
});

app.post("/traitement/update", jsonParser, async (req, res) => {
  try {
    const result = await models.traitement.update(
      {
        id_patient: req.body.id_patient,
        medicament: req.body.medicament,
        dose_midi: req.body.dose_midi,
        dose_soir: req.body.dose_soir,
        dose_matin: req.body.dose_matin,
        date_debut: req.body.date_debut,
        date_fin: req.body.date_fin
      },
      {
        where: {
          id: req.body.id
        }
      }
    );
    res.json(result);
  } catch (error) {
    res.send(JSON.stringify(error.message));
  }
});

app.post("/traitement/delete", jsonParser, async (req, res) => {
  try {
    const result = await models.traitement.destroy({
      where: {
        id: req.body.id
      }
    });
    res.json(result);
  } catch (error) {
    res.send(JSON.stringify(error.message));
  }
});

// CRUD photos
const storage = new Storage({
  credentials: { type: firebaseConfig.type,
    project_id: firebaseConfig.project_id,
    private_key_id: firebaseConfig.private_key_id,
    private_key: firebaseConfig.private_key,
    client_email: firebaseConfig.client_email,
    client_id: firebaseConfig.client_id,
    auth_uri: firebaseConfig.auth_uri,
    token_uri: firebaseConfig.token_uri,
    auth_provider_x509_cert_url: firebaseConfig.auth_provider_x509_cert_url,
    client_x509_cert_url: firebaseConfig.client_x509_cert_url},
  projectId: 'images-3e2d3',
});
const bucket = storage.bucket('images-3e2d3.appspot.com');
const multerStorage = multer.memoryStorage();
const upload = multer({ storage: multerStorage });
// const storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//       callback(null, '../front/myapp/public/img');
//   },
//   filename: (req, file, callback) => {
//       callback(null,file.originalname);
//   }
// });
// app.use(multer({ storage: storage }).single('myFile'));
// app.post('/photos/upload', function (req, res) {
// });
app.post('/photos/upload', upload.single('myFile'), (req, res, next) => {
  if (!req.file) {
    res.status(400).json({ error: 'Aucun fichier trouvé' });
    return;
  }

  const file = bucket.file(req.file.originalname);
  const blobStream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype
    }
  });

  blobStream.on('error', (error) => {
    console.log(error);
    res.status(500).json({ error: 'Erreur lors de l\'upload du fichier' });
  });

  blobStream.on('finish', () => {
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${file.name}`;
    res.status(200).json({ imageUrl: publicUrl });
  });

  blobStream.end(req.file.buffer);
});
app.use(bodyParser.urlencoded({ extended: true }));
app.post("/photos/insert", jsonParser, async (req, res) => {
  try {
    const result = await models.photos.create({
      id_patient: req.body.id_patient,
      type: req.body.type,
      image: req.body.image,
      groupe: req.body.groupe
    });
    res.json(result);
  } catch (error) {
    res.send(JSON.stringify(error.message));
  }
});

app.get("/photos/list", async (req, res) => {
  try {
    const photos = await models.photos.findAll({});
    res.send(photos);
  } catch (error) {
    res.send(JSON.stringify(error.message));
  }
});

app.post("/photos/update", jsonParser, async (req, res) => {
  try {
    const result = await models.photos.update(
      {
        id_patient: req.body.id_patient,
        type: req.body.type,
        image: req.body.image,
        groupe: req.body.groupe
      },
      {
        where: {
          id: req.body.id
        }
      }
    );
    res.json(result);
  } catch (error) {
    res.send(JSON.stringify(error.message));
  }
});

app.post("/photos/delete", jsonParser, async (req, res) => {
  try {
    const result = await models.photos.destroy({
      where: {
        id: req.body.id
      }
    });
    res.json(result);
  } catch (error) {
    res.send(JSON.stringify(error.message));
  }
});

//CRUD plaies
app.use(bodyParser.urlencoded({ extended: true }));
app.post("/plaies/insert", jsonParser, async (req, res) => {
  try {
    const result = await models.plaies.create({
      id_patient: req.body.id_patient,
      text: req.body.text,
      groupe: req.body.groupe,
      type: req.body.type
    });
    res.json(result);
  } catch (error) {
    res.send(JSON.stringify(error.message));
  }
});

app.get("/plaies/list", async (req, res) => {
  try {
    const plaies = await models.plaies.findAll({});
    res.send(plaies);
  } catch (error) {
    res.send(JSON.stringify(error.message));
  }
});

app.post("/plaies/update", jsonParser, async (req, res) => {
  try {
    const result = await models.plaies.update(
      {
        id_patient: req.body.id_patient,
        text: req.body.text,
        groupe: req.body.groupe,
        type: req.body.type
      },
      {
        where: {
          id: req.body.id
        }
      }
    );
    res.json(result);
  } catch (error) {
    res.send(JSON.stringify(error.message));
  }
});

app.post("/plaies/delete", jsonParser, async (req, res) => {
  try {
    const result = await models.plaies.destroy({
      where: {
        id: req.body.id
      }
    });
    res.json(result);
  } catch (error) {
    res.send(JSON.stringify(error.message));
  }
});
//CRUD bilan
app.use(bodyParser.urlencoded({ extended: true }));
app.post("/bilan/insert", jsonParser, async (req, res) => {
  try {
    const result = await models.bilan.create({
      id_patient: req.body.id_patient,
      text: req.body.text,
      weekly: req.body.weekly,
      date: req.body.date,
      groupe: req.body.groupe,
      shift: req.body.shift,
      date_debut: req.body.date_debut,
      date_fin: req.body.date_fin
    });
    res.json(result);
  } catch (error) {
    res.send(JSON.stringify(error.message));
  }
});

app.get("/bilan/list", async (req, res) => {
  try {
    const bilans = await models.bilan.findAll({});
    res.send(bilans);
  } catch (error) {
    res.send(JSON.stringify(error.message));
  }
});

app.post("/bilan/update", jsonParser, async (req, res) => {
  try {
    const result = await models.bilan.update(
      {
        id_patient: req.body.id_patient,
        text: req.body.text,
        weekly: req.body.weekly,
        date: req.body.date,
        groupe: req.body.groupe,
        shift: req.body.shift,
        date_debut: req.body.date_debut,
        date_fin: req.body.date_fin
      },
      {
        where: {
          id: req.body.id
        }
      }
    );
    res.json(result);
  } catch (error) {
    res.send(JSON.stringify(error.message));
  }
});

app.post("/bilan/delete", jsonParser, async (req, res) => {
  try {
    const result = await models.bilan.destroy({
      where: {
        id: req.body.id
      }
    });
    res.json(result);
  } catch (error) {
    res.send(JSON.stringify(error.message));
  }
});
//CRUD rdv
app.use(bodyParser.urlencoded({ extended: true }));
app.post("/rdv/insert", jsonParser, async (req, res) => {
  try {
    const result = await models.rdv.create({
      id_patient: req.body.id_patient,
      text: req.body.text,
      date: req.body.date,
      type: req.body.type
    });
    res.json(result);
  } catch (error) {
    res.send(JSON.stringify(error.message));
  }
});

app.get("/rdv/list", async (req, res) => {
  try {
    const rdvs = await models.rdv.findAll({});
    res.send(rdvs);
  } catch (error) {
    res.send(JSON.stringify(error.message));
  }
});

app.post("/rdv/update", jsonParser, async (req, res) => {
  try {
    const result = await models.rdv.update(
      {
        id_patient: req.body.id_patient,
        text: req.body.text,
        date: req.body.date,
        type: req.body.type
      },
      {
        where: {
          id: req.body.id
        }
      }
    );
    res.json(result);
  } catch (error) {
    res.send(JSON.stringify(error.message));
  }
});

app.post("/rdv/delete", jsonParser, async (req, res) => {
  try {
    const result = await models.rdv.destroy({
      where: {
        id: req.body.id
      }
    });
    res.json(result);
  } catch (error) {
    res.send(JSON.stringify(error.message));
  }
});
//Login
app.get("/user/list", async (req, res) => {
  try {
    const users = await models.compte.findAll({});
    res.send(users);
  } catch (error) {
    res.send(JSON.stringify(error.message));
  }
});
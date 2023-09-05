import { Router } from "express";
import multer from "multer";
import { processingInstance } from "../modules/processing/entities/Processing";
import { CheckService } from "../modules/processing/useCases/check/CheckService";
import { ProcessClass } from "../modules/processing/useCases/process/ProcessService";
import { CleanDBService } from "../modules/processing/useCases/cleanDB/CleanDBService";

const processingRoutes = Router();

// Configuração de armazenamento
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const now = new Date();
    const fileName = now.getTime() + '_' + file.originalname;

    cb(null, `${fileName}`)
  },
});

const upload = multer({ storage });

processingRoutes.post("/check", upload.single('zip_code_file'), async function (req, res) {
  const path = req.file.path;

  const checkService = new CheckService();
  const correctFile = await checkService.execute({ path });
  
  if (!correctFile) {
    return res.json({ error: true, description: "Arquivo inválido!" });
  }

  return res.json(processingInstance);
});

processingRoutes.post("/import", async function (req, res) {
  const processClass = new ProcessClass();
  processClass.execute()

  return res.json(processingInstance);
});

processingRoutes.get("/", function (req, res) {
  return res.json(processingInstance);
});

processingRoutes.get("/clean", async function (req, res) {
  const cleanDBService = new CleanDBService();
  await cleanDBService.execute();

  return res.json({ success: true });
});

export { processingRoutes };

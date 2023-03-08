package rest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
public class FileUploadController {

  private static final String FILE_UPLOAD_PATH = "/path/to/save/uploads";

  @PostMapping("/upload")
  public ResponseEntity<?> uploadFile(@RequestParam("image") MultipartFile file) {
    try {
      // Speichern der hochgeladenen Datei auf dem Server
      Path filePath = Paths.get(FILE_UPLOAD_PATH + File.separator + file.getOriginalFilename());
      Files.write(filePath, file.getBytes());

      // Rückgabe einer Erfolgsantwort
      return ResponseEntity.ok().build();
    } catch (IOException e) {
      // Rückgabe einer Fehlerantwort
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading file: " + e.getMessage());
    }
  }
}

package Auth.Authentification.Controller;

import Auth.Authentification.Entity.Ward;
import Auth.Authentification.services.WardService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class WardController {

    @Autowired
    public WardService wardService;

    // Read all wards
    @GetMapping("/ward")
    @ResponseBody
    public ResponseEntity<List<Ward>> getAllWards() {
        List<Ward> list = wardService.selectWards();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    // Post wards endpoint
    @PostMapping("/ward")
    @ResponseBody
    public ResponseEntity<Ward> insertWard(@RequestBody Ward ward, HttpSession session) {
        System.out.println(ward);
        try {
            wardService.addWard(ward); // Save the ward and get the saved instance
            Ward savedWard = wardService.getWardById(ward.getId());  // Fetch the saved ward from the database
            return new ResponseEntity<>(savedWard, HttpStatus.OK); // Return the saved ward in the response
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Get ward by ID
    @GetMapping("/ward/{id}")
    public ResponseEntity<Ward> getWardById(@PathVariable Long id) {
        try {
            Ward ward = wardService.getWardById(id);
            if (ward != null) {
                return new ResponseEntity<>(ward, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Update ward by ID
    @RequestMapping("/ward/{id}")
    @PutMapping("/{id}")
    public ResponseEntity<Ward> editWard(@PathVariable("id") Long id, @RequestBody Ward updatedWard) {
        Ward existingWard = wardService.getWardById(id);

        if (existingWard != null) {
            // Update the existing ward with new details
            existingWard.setWard_name(updatedWard.getWard_name());
            existingWard.setPopulation(updatedWard.getPopulation());

            existingWard.setSchool(updatedWard.getSchool());

            existingWard.setHealth_care(updatedWard.getHealth_care());
            existingWard.setHouses(updatedWard.getHouses());
            existingWard.setPeople_alive(updatedWard.getPeople_alive());
            existingWard.setPeople_died(updatedWard.getPeople_died());


            // Save the updated ward
            wardService.addWard(existingWard);

            return new ResponseEntity<>(existingWard, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Delete ward by ID
    @DeleteMapping("/ward/{id}")
    public ResponseEntity<List<Ward>> deleteWard(@PathVariable("id") Long id) {
        Ward existingWard = wardService.getWardById(id);

        if (existingWard != null) {
            wardService.deleteWard(id);  // Delete the ward
            System.out.println("Ward with ID " + id + " deleted successfully.");
            List<Ward> remainingWards = wardService.selectWards();
            return new ResponseEntity<>(remainingWards, HttpStatus.OK);
        } else {
            System.out.println("Ward with ID " + id + " not found.");
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/ward/count")
    @ResponseBody
    public ResponseEntity<Long> countAllWards() {
        long count = wardService.countWards();
        return new ResponseEntity<>(count, HttpStatus.OK);
    }
    @GetMapping("/wardsAccount")
    public String WardAccount() {
        return "wardsAccount";
    }
}

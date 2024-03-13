package Auth.Authentification.Controller;

import Auth.Authentification.Entity.Leader;
import Auth.Authentification.services.LeaderService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class LeaderController {

    @Autowired
    public LeaderService leaderService;

    // Read all leaders
    @GetMapping("/leader")
    @ResponseBody
    public ResponseEntity<List<Leader>> getAllLeaders() {
        List<Leader> list = leaderService.selectLeaders();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    // Post leaders endpoint
    @PostMapping("/leader")
    @ResponseBody
    public ResponseEntity<Leader> insertLeaders(@RequestBody Leader leader, HttpSession session) {
        System.out.println(leader);
        try {
            leaderService.addLeader(leader); // Save the leader and get the saved instance
            Leader savedLeader = leaderService.getLeaderById(leader.getId());  // Fetch the saved leader from the database
            return new ResponseEntity<>(savedLeader, HttpStatus.OK); // Return the saved leader in the response
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Get leader by ID
    @GetMapping("/leader/{id}")
    public ResponseEntity<Leader> getLeaderById(@PathVariable Long id) {
        try {
            Leader leader = leaderService.getLeaderById(id);
            if (leader != null) {
                return new ResponseEntity<>(leader, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Update leader by ID
    @RequestMapping("/leader/{id}")
    @PutMapping("/{id}")
    public ResponseEntity<Leader> editLeader(@PathVariable("id") Long id, @RequestBody Leader updatedLeader) {
        Leader existingLeader = leaderService.getLeaderById(id);

        if (existingLeader != null) {
            // Update the existing leader with new details
            existingLeader.setFirstname(updatedLeader.getFirstname());
            existingLeader.setLastname(updatedLeader.getLastname());

            existingLeader.setGender(updatedLeader.getGender());

            existingLeader.setPhone(updatedLeader.getPhone());
            existingLeader.setNational_id_number(updatedLeader.getNational_id_number());
            existingLeader.setResident(updatedLeader.getResident());
            existingLeader.setPosition(updatedLeader.getPosition());
            existingLeader.setWard_leading(updatedLeader.getWard_leading());

            // Save the updated leader
            leaderService.addLeader(existingLeader);

            return new ResponseEntity<>(existingLeader, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Delete leader by ID
    @DeleteMapping("/leader/{id}")
    public ResponseEntity<List<Leader>> deleteLeader(@PathVariable("id") Long id) {
        Leader existingLeader = leaderService.getLeaderById(id);

        if (existingLeader != null) {
            leaderService.deleteLeader(id);  // Delete the leader
            System.out.println("Leader with ID " + id + " deleted successfully.");
            List<Leader> remainingLeaders = leaderService.selectLeaders();
            return new ResponseEntity<>(remainingLeaders, HttpStatus.OK);
        } else {
            System.out.println("Leader with ID " + id + " not found.");
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/leader/count")
    @ResponseBody
    public ResponseEntity<Long> countAllLeaders() {
        long count = leaderService.countLeaders();
        return new ResponseEntity<>(count, HttpStatus.OK);
    }

    @GetMapping("/leadersAccount")
    public String LeaderAccount() {
        return "leadersAccount";
    }
}

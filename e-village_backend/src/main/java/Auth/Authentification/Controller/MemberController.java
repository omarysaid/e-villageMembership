// MemberController.java
package Auth.Authentification.Controller;

import Auth.Authentification.Entity.Member;
import Auth.Authentification.services.MemberService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class MemberController {

    @Autowired
    public MemberService memberService;

    @GetMapping("/member")
    @ResponseBody
    public ResponseEntity<List<Member>> getAllMembers() {
        List<Member> list = memberService.selectMembers();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @PostMapping("/member")
    @ResponseBody
    public ResponseEntity<Member> insertMembers(@RequestBody Member member, HttpSession session) {
        System.out.println(member);
        try {
            memberService.addMember(member);
            Member savedMember = memberService.getMemberById(member.getId());
            return new ResponseEntity<>(savedMember, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping("/member/{id}")
    @PutMapping("/{id}")
    public ResponseEntity<Member> editMember(@PathVariable("id") Long id, @RequestBody Member updatedMember) {
        Member existingMember = memberService.getMemberById(id);

        if (existingMember != null) {
            existingMember.setFirstname(updatedMember.getFirstname());
            existingMember.setLastname(updatedMember.getLastname());
            existingMember.setDate_of_birth(updatedMember.getDate_of_birth());
            existingMember.setGender(updatedMember.getGender());
            existingMember.setStreet(updatedMember.getStreet());
            existingMember.setPostal_code(updatedMember.getPostal_code());
            existingMember.setWard(updatedMember.getWard());
            existingMember.setOccupation(updatedMember.getOccupation());
            existingMember.setPhone(updatedMember.getPhone());
            existingMember.setVillage_relation(updatedMember.getVillage_relation());
            existingMember.setDisorder(updatedMember.getDisorder());

            memberService.addMember(existingMember);

            return new ResponseEntity<>(existingMember, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/member/{id}")
    public ResponseEntity<List<Member>> deleteMember(@PathVariable("id") Long id) {
        Member existingMember = memberService.getMemberById(id);

        if (existingMember != null) {
            memberService.deleteMember(id);
            System.out.println("Member with ID " + id + " deleted successfully.");
            List<Member> remainingMembers = memberService.selectMembers();
            return new ResponseEntity<>(remainingMembers, HttpStatus.OK);
        } else {
            System.out.println("Member with ID " + id + " not found.");
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/member/count")
    @ResponseBody
    public ResponseEntity<Long> countAllMembers() {
        long count = memberService.countMembers();
        return new ResponseEntity<>(count, HttpStatus.OK);
    }

    @GetMapping("/membersAccount")
    public String MemberAccount() {
        return "membersAccount";
    }


}

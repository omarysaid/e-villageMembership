package Auth.Authentification.Controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    // read all users
    @GetMapping
    public ResponseEntity<String> sayHello(){
        return ResponseEntity.ok("wellcome User");
    }
}

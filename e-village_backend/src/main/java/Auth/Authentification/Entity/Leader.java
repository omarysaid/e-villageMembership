package Auth.Authentification.Entity;
import jakarta.persistence.*;
import lombok.Data;


@Entity
@Data
@Table(name="leaders")
public class Leader {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Long id;


    @Column(nullable=false)
    private  String firstname;

    @Column(nullable=false)
    private  String lastname;

    @Column(nullable=false)
    private  String gender;

    @Column(nullable=false)
    private  String phone;

    @Column(nullable=false)
    private  String national_id_number;

    @Column(nullable=false)
    private  String resident;

    @Column(nullable=false)
    private  String position;

    @Column(nullable=false)
    private  String ward_leading;




}
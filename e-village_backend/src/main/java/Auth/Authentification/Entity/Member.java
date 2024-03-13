package Auth.Authentification.Entity;


import jakarta.persistence.*;
import lombok.Data;


@Entity
@Data
@Table(name="members")
public class Member {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Long id;


    @Column(nullable=false)
    private  String firstname;

    @Column(nullable=false)
    private  String lastname;

    @Column(nullable=false)
    private  String date_of_birth;

    @Column(nullable=false)
    private  String gender;

    @Column(nullable=false)
    private  String street;

    @Column(nullable=false)
    private  String postal_code;

    @Column(nullable=false)
    private  String ward;

    @Column(nullable=false)
    private  String occupation;

    @Column(nullable=false)
    private  String phone;

    @Column(nullable=false)
    private  String village_relation;

    @Column(nullable=false)
    private  String disorder;


}

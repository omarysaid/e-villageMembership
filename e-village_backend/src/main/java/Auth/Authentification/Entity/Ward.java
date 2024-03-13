package Auth.Authentification.Entity;


import jakarta.persistence.*;
import lombok.Data;


@Entity
@Data
@Table(name="wards")
public class Ward {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Long id;


    @Column(nullable=false)
    private  String ward_name;

    @Column(nullable=false)
    private  String population;

    @Column(nullable=false)
    private  String school;

    @Column(nullable=false)
    private  String health_care;

    @Column(nullable=false)
    private  String houses;

    @Column(nullable=false)
    private  String people_alive;

    @Column(nullable=false)
    private  String people_died;




}
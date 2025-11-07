import java.beans.Customizer;
import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Iterator;
import java.util.Scanner;

//TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or
// click the <icon src="AllIcons.Actions.Execute"/> icon in the gutter.
public class Main
{
    public static void main(String[] args)
    {

        int i,n,duration;
        double kostos,epitokio,didaktra,sump1=0;
        String onomateponymo,tupo;
        float sqm,sum=0,sum1=0,sump=0;


        Scanner sc=new Scanner(System.in); //DHLOSH MEYABLHTHS sc GIA EISAGOGH DEDOMENON
        Loan [] loans;  // vazoyme pinaka se klash
        loans = new Loan[3]; // desmeuoyme mnhmh gia statiko pinaka


        //int duration, double amount, String customer,float sqm
        System.out.println("dwse diarkeia , kostos, onomatepwnymo, tetragwnika");
        //me tis upoloipes timew eisagoume times apo to pliktrologio gia ta sugkekrimena orismata
        duration=sc.nextInt();
        kostos=sc.nextDouble();
        onomateponymo=sc.nextLine(); // edw mpainei enter
        sc.nextLine(); // afairei to enter
        sqm=sc.nextFloat();
        HomeLoan c= new HomeLoan(duration,kostos,onomateponymo,sqm);

        //int duration, double amount, String customer, String cartype,double epitokio
        System.out.println("dwse diarkeia , kostos, onomatepwnymo, tupo autokinitou, epitokio");
        duration=sc.nextInt();
        kostos=sc.nextDouble();
        onomateponymo=sc.nextLine(); // edw mpainei enter
        sc.nextLine(); // afairei to enter
        tupo=sc.nextLine();

        epitokio=sc.nextDouble();
        CarLoan s = new CarLoan(duration, kostos, onomateponymo, tupo,epitokio);

        //int duration, double amount, String customer, double fees)
        System.out.println("dwse diarkeia, kostos, onomateponymno, didasktra");
        duration=sc.nextInt();
        kostos=sc.nextDouble();
        onomateponymo=sc.nextLine(); // edw mpainei enter
        sc.nextLine();
        didaktra=sc.nextDouble();
        StudiesLoan t= new StudiesLoan(duration, kostos,onomateponymo,didaktra);

        //vazoyme ta daneia poy dhmiourghsame ston pinaka loans
        loans[0]=c;
        loans[1]=s;
        loans[2]=t;

        System.out.println("Pinakas Daneion" );
        for (i=0;i<loans.length;i++)
            if (loans[i] instanceof HomeLoan) // o telestis instanceof elegxei to arxiko tupo tou loans[i] prin auto mpei ston pinaka loans
                System.out.println("To daneio einai Stegastiko me stoixeia "+ loans[i].toString());
            else
                if (loans[i] instanceof CarLoan)
                    System.out.println("to daneio einai daneio autokinitou me stoixeia" + loans[i].toString());
                else
                    if (loans[i] instanceof StudiesLoan)
                        System.out.println("to daneio einai Foititiko me stoixeia" + loans[i].toString());


        for (i=0;i<loans.length;i++) //athroizoyme toys tokous apo kathe daneio
        {
            sum += loans[i].tokos();
            sump += loans[i].getAmount();
        }

        System.out.println("Athroisma tokwn= " +sum);




            ArrayList<Loan> loans2;
       loans2= new ArrayList<Loan>(); // dunamikos pinakas

       loans2.add(c);
       loans2.add(s);
       loans2.add(t);

        System.out.println("ArrayList Daneion");
        for (i=0; i<loans2.size();i++)
            if (loans2.get(i) instanceof HomeLoan) // o telestis instanceof elegxei to arxiko tupo tou loans[i] prin auto mpei ston pinaka loans
                System.out.println("To daneio einai Stegastiko me stoixeia "+ loans2.toString());
            else
                if (loans2.get(i) instanceof CarLoan) //i methodos get epistrefei to stoixeio tou arraylist sti thesh i
                System.out.println("to daneio einai daneio autokinitou me stoixeia" + loans2.toString());
                else
                    if (loans2.get(i) instanceof StudiesLoan)
                        System.out.println("to daneio einai Foititiko me stoixeia" + loans2.toString());



        System.out.println("\nArrayList Daneion 2");
        for (Loan d:loans2) // se kathe epanalipsi sto d mpainei ena stoixeio tou arraylist (efauksimeno for) deuteros tropos gia dynamiko pinaka
            if (d instanceof HomeLoan) // o telestis instanceof elegxei to arxiko tupo tou loans[i] prin auto mpei ston pinaka loans
                System.out.println("To daneio einai Stegastiko me stoixeia "+ d.toString());
            else
                if (d instanceof CarLoan) //i methodos get epistrefei to stoixeio tou arraylist sti thesh i
                    System.out.println("to daneio einai daneio autokinitou me stoixeia" + d.toString());
                else
                    if (d instanceof StudiesLoan)
                        System.out.println("to daneio einai Foititiko me stoixeia" + d.toString());

        System.out.println("\nArrayList Daneion 3"); // tritos tropos gia dynamiko pinaka
        Iterator<Loan> iter=loans2.iterator();
        while (iter.hasNext()) //oso uparxoyn stoixeia sto ArrayList
        {
            Loan temp = (Loan) iter.next();//to epomeno stoixeio tou arraylist loans2 lamvanetai apo itn sinartisei next kai epistrefetai stin
            // topiki metavliti temp
            if (temp instanceof HomeLoan) // o telestis instanceof elegxei to arxiko tupo tou loans[i] prin auto mpei ston pinaka loans
                System.out.println("To daneio einai Stegastiko me stoixeia " + temp.toString());
            else if (temp instanceof CarLoan) //i methodos get epistrefei to stoixeio tou arraylist sti thesh i
                System.out.println("to daneio einai daneio autokinitou me stoixeia" + temp.toString());
            else if (temp instanceof StudiesLoan)
                System.out.println("to daneio einai Foititiko me stoixeia" + temp.toString());
        }
        for (i=0; i<loans2.size();i++)
        {
            sum1+=loans2.get(i).tokos();
            sump1+=loans2.get(i).getAmount();
        }
        System.out.println("Sunolikos tokos= " + sum1 + "sunoliko amount= " + sump1);

    }
}
import java.util.InputMismatchException;
import java.util.Scanner;

//TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or
// click the <icon src="AllIcons.Actions.Execute"/> icon in the gutter.
public class Main
{
    public static void main(String[] args)
    {
        Scanner sc=new Scanner(System.in);
        double sqm,rentcost,extracost;
        String type, extras;
        int floor,floors;
        boolean airbnb;

        try
        {
            System.out.println("dwse dieuthinsi 1hs polykatoimk");
            String address = sc.nextLine(); //diabazei mia grammi apo to pliktrologio

            System.out.println("dwse plithos diamerismatwn");
            floors = sc.nextInt();

            Building b1 = new Building(address, floors);

            System.out.println("Δώσε ΤΜ, Κόστος Ενοικίασης, Τύπο Διαμερίσματος και Όροφο 1ου Διαμερίσματος");
            sqm = sc.nextDouble();
            rentcost = sc.nextDouble();
            type = sc.next();
            floor = sc.nextInt();

            Flat f1 = new Flat(sqm, rentcost, type, floor);

            b1.addFlat(f1);

            b1.printBuilding();

            System.out.println("Δώσε ΤΜ, Κόστος Ενοικίασης, Τύπο Διαμερίσματος και Όροφο Διαμερίσματος 2ου διαμερίσματος");
            sqm = sc.nextDouble();
            rentcost = sc.nextDouble();
            type = sc.next();
            floor = sc.nextInt();

            Flat f2 = new Flat(sqm, rentcost, type, floor);

            b1.addFlat(f2);

            b1.printBuilding();

            Flat f3 = new Flat();
            b1.addFlat(f3);
            b1.printBuilding();


            LuxuryFlat c1 = new LuxuryFlat(sqm, rentcost, type, floor, 100);
            b1.addFlat(c1);

            sc.nextLine(); // prin apo to epomeno nextline prepei na valoyme auti tin entoli gia na aferesei to enter poy exei krathseie o buffer tou


            System.out.println("dwse deiuthinsi 2hs polykatoikias");
            address = sc.nextLine();

            System.out.println("dwse plithos orofwn");
            floors = sc.nextInt();

            Building b2 = new Building(address, floors);

            System.out.println("dwse tetragwnika");
            sqm = sc.nextDouble();

            System.out.println("dwse kostos enoikoiasis");
            rentcost = sc.nextDouble();

            if (rentcost<0)
                throw new ArnitikoKostosEnoikiasis("Δόθηκε Αρνητικό Κόστος Ενοικίασης Διαμερίσματος");

            System.out.println("dwse typo diamerismatos");
            type = sc.next();

            System.out.println("dwse orofo");
            floor = sc.nextInt();

            System.out.println("dwse an einai airnbnb tue h false");
            airbnb = sc.nextBoolean();

            System.out.println("dwse extras");
            extras = sc.next();

            SpecialFlat s1 = new SpecialFlat(sqm, rentcost, type, floor, airbnb, extras);

            b2.addFlat(s1);

            System.out.println(" esoda apo ola ta diamerismata= " + Building.getIncome());
        }
        catch (InputMismatchException e)
        {
            System.err.println("Λάθος δεδομένα");
        }

        catch (ArnitikoKostosEnoikiasis e)
        {

        }

    }
}
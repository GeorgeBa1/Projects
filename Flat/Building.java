import javax.swing.plaf.basic.BasicInternalFrameTitlePane;
import java.util.ArrayList;

public class Building
{
    //ta melh address kai floors einai melh stigmiotypou
    private String address;
    private int floors;
    ArrayList<Flat> flats; //ENTHYLAKOSH
    private static double income=0;

    public Building(String address,int floors)
    {
        this.address=address;
        this.floors=floors;
        flats=new ArrayList<Flat>();
    }

    public Building()
    {
        this.address="Patreos 9";
        this.floors=0;
        flats=new ArrayList<Flat>();
    }

    public void setAddress(String address)
    {
        this.address = address;
    }

    public void setFlats(ArrayList<Flat> flats)
    {
        this.flats = flats;
    }

    public int getFloor()
    {
        return floors;
    }

    public void setFloor(int floors)
    {
        this.floors = floors;
    }

    public ArrayList<Flat> getFlats()
    {
        return flats;
    }

    public String getAddress()
    {
        return address;
    }

    public void addFlat(Flat f)
    {
        flats.add(f);
        income+=f.getRentcost();
    }

    public static double getIncome()
    {
        return income;
    }

    public void removeFlat(Flat f)
    {
        flats.remove(f);
    }

    public void printBuilding()
    {
        System.out.println("Address = " + address + " Building Floors = " + floors);

        for (int i=0;i<flats.size();i++)
            System.out.println(flats.get(i).toString());

        System.out.println("=".repeat(90)); // with newline
    }

}

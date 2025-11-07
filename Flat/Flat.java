public class Flat
{
    protected double sqm;
    protected double rentcost;
    protected String type;
    protected int floor;

    public Flat(double sqm, double rentcost, String type, int floor)
    {
        this.sqm = sqm;
        this.rentcost = rentcost;
        this.type = type;
        this.floor = floor;
    }

    public Flat()
    {
        this.sqm=0;
        this.rentcost=0;
        this.type=" ";
        this.floor=0;
    }

    public void setSqm(double sqm)
    {
        this.sqm = sqm;
    }

    public void setFloor(int floor)
    {
        this.floor = floor;
    }

    public void setType(String type)
    {
        this.type = type;
    }

    public void setRentcost(double rentcost)
    {
        this.rentcost = rentcost;
    }

    public double getSqm()
    {
        return sqm;
    }

    public double getRentcost()
    {
        return rentcost;
    }

    public String getType()
    {
        return type;
    }

    public int getFloor()
    {
        return floor;
    }

    @Override
    public String toString()
    {
        return "Flat: Square Meters " + sqm + ", rentcost=" + rentcost + ", type='" + type + '\'' + ", floor=" + floor;
    }
}

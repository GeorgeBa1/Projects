public final class SpecialFlat extends Flat
{
    private boolean airbnb;
    private String extras;

    public SpecialFlat(double sqm, double rentcost, String type, int floor,boolean airbnb, String extras)
    {
        super(sqm,rentcost,type,floor);
        this.airbnb=airbnb;
        this.extras=extras;
    }

    public SpecialFlat()
    {
        this.airbnb=false;
        this.extras="";
    }

    public void setAirbnb(boolean airbnb)
    {
        this.airbnb = airbnb;
    }

    public void setExtras(String extras)
    {
        this.extras = extras;
    }

    public boolean isAirbnb()
    {
        return airbnb;
    }

    public String getExtras()
    {
        return extras;
    }

    public String toString()
    {
        return super.toString() + " airbnb= " + airbnb + " extras " + extras;
    }


}

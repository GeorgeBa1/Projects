public final class LuxuryFlat extends Flat
{
    private double extracost;


    public LuxuryFlat (double sqm, double rentcost, String type, int floor, double extracost)
    {
        super(sqm, rentcost, type, floor);
        this.extracost=extracost;
    }

    public LuxuryFlat()
    {
        this.extracost=0;
    }

    public void setExtracost(double extracost)
    {
        this.extracost = extracost;
    }

    public double getExtracost()
    {
        return extracost;
    }

    public String toString()
    {
        return super.toString() + "extracost = " + extracost;
    }
}

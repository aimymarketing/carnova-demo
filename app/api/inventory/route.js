export async function GET() {
  const vehicles = [
    { id: "01234", year: 2021, make: "Nissan", model: "NV200", colour: "White", km: 71000, price: 19995, status: "AVAILABLE" },
    { id: "NO05882", year: 2019, make: "Harley-Davidson", model: "Road Glide", colour: "Red", km: 45000, price: 27900, status: "AVAILABLE" },
    { id: "543221", year: 2015, make: "Audi", model: "S3", colour: "Dark Gray", km: 196040, price: 9995, status: "AVAILABLE" },
    { id: "510-120", year: 2015, make: "Ford", model: "Edge SEL", colour: "Deep Impact Blue", km: 177957, price: 9995, status: "AVAILABLE" },
    { id: "602-154", year: 2015, make: "Jeep", model: "Renegade Latitude", colour: "Sierra Blue", km: 181534, price: 8995, status: "AVAILABLE" },
    { id: "602-151", year: 2015, make: "Volkswagen", model: "Jetta 2.0L Tredline", colour: "Black", km: 166066, price: 7995, status: "AVAILABLE" },
    { id: "512-136", year: 2015, make: "Dodge", model: "Grand Caravan", colour: "Granite Crystal", km: 237816, price: 6995, status: "AVAILABLE" },
    { id: "R1", year: 2014, make: "Infiniti", model: "QX60", colour: "Moonlight White", km: 181111, price: 8995, status: "AVAILABLE" },
    { id: "512-142", year: 2014, make: "BMW", model: "X6 xDrive50i", colour: "Alpine White", km: 281513, price: 12995, status: "AVAILABLE" },
    { id: "601-145", year: 2014, make: "Mazda", model: "Mazda5", colour: "Jet Black", km: 206674, price: 5995, status: "AVAILABLE" },
    { id: "602-153-1", year: 2013, make: "Dodge", model: "Journey R/T", colour: "Black", km: 220125, price: 5995, status: "AVAILABLE" },
    { id: "602-153-2", year: 2013, make: "Hyundai", model: "Accent GLS", colour: "Ironman Silver", km: 250831, price: 3995, status: "AVAILABLE" },
    { id: "12345", year: 2013, make: "Ford", model: "E-350", colour: "White", km: 175000, price: 12995, status: "AVAILABLE" },
    { id: "512136", year: 2013, make: "Ford", model: "Escape Titanium", colour: "Frosted Glass", km: 204019, price: 5995, status: "AVAILABLE" },
    { id: "603-158", year: 2013, make: "Subaru", model: "Crosstrek", colour: "Premium", km: 227658, price: 6995, status: "AVAILABLE" },
    { id: "S1", year: 2013, make: "Ford", model: "Escape", colour: "Grey", km: 216125, price: 5995, status: "AVAILABLE" },
    { id: "410063", year: 2013, make: "BMW", model: "X1", colour: "Alpine White", km: 112000, price: 9995, status: "AVAILABLE" },
    { id: "603-157", year: 2012, make: "Hyundai", model: "Elantra GLS", colour: "Silver", km: 203451, price: 3995, status: "AVAILABLE" },
    { id: "602-152", year: 2012, make: "Audi", model: "Q5 2.0L Premium", colour: "Blue", km: 251125, price: 7995, status: "AVAILABLE" },
    { id: "601-147", year: 2012, make: "Dodge", model: "Avenger SE", colour: "Copperhead Pearl", km: 240180, price: 3995, status: "AVAILABLE" },
    { id: "511-129", year: 2012, make: "Toyota", model: "Tundra LTD", colour: "Spruce Mica", km: 139505, price: 17995, status: "AVAILABLE" },
    { id: "512-134", year: 2012, make: "Subaru", model: "Outback 2.5i Prem", colour: "Crystal Black", km: 235685, price: 6995, status: "AVAILABLE" },
    { id: "511-132", year: 2011, make: "Ram", model: "1500 Outdoorsman", colour: "Bright White", km: 201000, price: 9995, status: "AVAILABLE" },
    { id: "509-119A", year: 2010, make: "Ford", model: "F-150 XLT", colour: "White", km: 232125, price: 8995, status: "AVAILABLE" },
    { id: "602-149", year: 2010, make: "Toyota", model: "Tundra 4WD", colour: "Black", km: 235951, price: 10995, status: "AVAILABLE" },
    { id: "NO0984", year: 2006, make: "Harley-Davidson", model: "Vrod", colour: "Red", km: 9800, price: 7995, status: "AVAILABLE" },
    { id: "0101", year: 2000, make: "BMW", model: "R1100RT", colour: "Green", km: 130000, price: 4900, status: "AVAILABLE" },
    { id: "1324", year: 1986, make: "Nissan", model: "300ZX", colour: "Red", km: 200000, price: 15000, status: "AVAILABLE" },
    { id: "0202", year: 1970, make: "Pedlon", model: "Quadracycle", colour: "Blue", km: 0, price: 1200, status: "AVAILABLE" }
  ];
  return Response.json(vehicles);
}

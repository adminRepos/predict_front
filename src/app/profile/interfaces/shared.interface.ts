export interface IHiperParametros {
    METRICA: string,
    VALOR: number|string,
    MODELO: string,
    TIPO_DE_DATOS: string
}


export interface optionSelector{
  value:number|string,
  option:string
}

export interface optionSelectorHiper{
  value:number|string,
  option:string,
  modelo:string
}

export interface ICargaData{
  columnas: string[],
  data:any
}

export interface CarreraAnaliticaDiagnostica{
  value:number,
  option:string,
  file:string
}

export interface IFormPractico{
  carrera:string, 
  semestre:string|number, 
  tipoModelo:string
}

export interface IFormPracticoVariables{
  codigo:string, 
  descripcion:string
  rule?:Boolean,
  rules?:IInputRules[]
}

export interface IInputRules{
  valor:number, 
  descripcion:string
}

export interface IArrayRules{
  string:string, 
  rules:IInputRules[]
}

export interface Diccionario{
  codigo: string, 
  descripcion: string
}

export interface DatosGraficas {
  variable: string;
  labels: string[];
  data: string[][];
  legend: string[];
}

export interface DataExcelToArray{
  columns: String[],
  data: String[][]
}

export interface EndPoint {
  url: string,
  publicName: string,
  prediction: number
}

export interface IPrediccionPractico {
  nombre: string,
  prediccion: number|string
}

export interface IPrediccionPracticoTextos{
  rendimiento: number,
  parrafo: string,
  recomendacion: string
}

export interface CuerpoAnalitics {
  estrato: number|null,
  biologia: number|null,
  quimica: number|null,
  fisica: number|null,
  sociales: number|null,
  aptitud_verbal: number|null,
  espanol_literatura: number|null,
  aptitud_matematica: number|null,
  condicion_matematica: number|null,
  filosofia: number|null,
  historia: number|null,
  geografia: number|null,
  idioma: number|null,
  puntos_icfes: number|null,
  puntos_homologados: number|null,
  anno_nota: number|null,
  semestre_nota: number|null,
  promedio: number|null,
  genero_FEMENINO: number|null,
  genero_MASCULINO: number|null,
  genero_NO_REGISTRA: number|null
}

export const bdGenero: IInputRules[] = [
  {descripcion: "MASCULINO", valor: 0},
  {descripcion: "FEMENINO", valor: 1},
]

export const bdCorte: IInputRules[] = [
  {descripcion: "1", valor: 1},
  {descripcion: "2", valor: 2},
]

export const bdEstrato: IInputRules[] = [
  {descripcion: "0", valor: 0},
  {descripcion: "1", valor: 1},
  {descripcion: "2", valor: 2},
  {descripcion: "3", valor: 3},
  {descripcion: "4", valor: 4},
  {descripcion: "5", valor: 5},
  {descripcion: "6", valor: 6},
]

export const bdEstadoPrueba: IInputRules[] = [
  {descripcion: "NA (NO APLICA)", valor: 0},
  {descripcion: "NO", valor: 1},
  {descripcion: "SI", valor: 2},
]

export const bdEstadoFinal: IInputRules[] = [
  {descripcion: "ABANDONO", valor: 1},
  {descripcion: "ACTIVO", valor: 2},
  {descripcion: "APLAZO", valor: 3},
  {descripcion: "CANCELADO", valor: 4},
  {descripcion: "EGRESADO", valor: 5},
  {descripcion: "INACTIVO", valor: 6},
  {descripcion: "MOVILIDAD", valor: 7},
  {descripcion: "N.A.", valor: 8},
  {descripcion: "NO ESTUDIANTE AC004", valor: 9},
  {descripcion: "NO SUP. PRUEBA ACAD.", valor: 10},
  {descripcion: "PRUEBA AC Y ACTIVO", valor: 11},
  {descripcion: "PRUEBA ACAD", valor: 12},
  {descripcion: "RETIRADO", valor: 13},
  {descripcion: "TERMINO MATERIAS", valor: 14},
  {descripcion: "TERMINO Y MATRICULO", valor: 15},
  {descripcion: "VACACIONES", valor: 16}
]

export const bdInscripcion: IInputRules[] = [
  {descripcion: "NO REGISTRA", valor: 0},
  {descripcion: "BENEFICIARIOS LEY 1081 DE 2006", valor: 1},
  {descripcion: "BENEFICIARIOS LEY 1084 DE 2006", valor: 2},
  {descripcion: "CONVENIO ANDRES BELLO", valor: 3},
  {descripcion: "DESPLAZADOS", valor: 4},
  {descripcion: "INDIGENAS", valor: 5},
  {descripcion: "MEJORES BACHILLERES COL. DISTRITAL OFICIAL", valor: 6},
  {descripcion: "MINORIAS ETNICAS Y CULTURALES", valor: 7},
  {descripcion: "MOVILIDAD ACADEMICA INTERNACIONAL", valor: 8},
  {descripcion: "NORMAL", valor: 9},
  {descripcion: "TRANSFERENCIA EXTERNA", valor: 10},
  {descripcion: "TRANSFERENCIA INTERNA", valor: 11}
]

export const bdLocalidad: IInputRules[] = [
  {descripcion: "NO REGISTRA", valor:	0},
  {descripcion: "USAQUEN", valor:	1},
  {descripcion: "CHAPINERO", valor:	2},
  {descripcion: "SANTA FE", valor: 3},
  {descripcion: "SAN CRISTOBAL", valor:	4},
  {descripcion: "USME", valor: 5},
  {descripcion: "TUNJUELITO", valor: 6},
  {descripcion: "BOSA", valor: 7},
  {descripcion: "KENNEDY", valor:	8},
  {descripcion: "FONTIBON", valor: 9},
  {descripcion: "ENGATIVA", valor: 10},
  {descripcion: "SUBA", valor: 11},
  {descripcion: "BARRIOS UNIDOS", valor: 12},
  {descripcion: "TEUSAQUILLO", valor:	13},
  {descripcion: "LOS MARTIRES", valor: 14},
  {descripcion: "ANTONIO NARINO", valor: 15},
  {descripcion: "PUENTE ARANDA", valor:	16},
  {descripcion: "CANDELARIA", valor: 17},
  {descripcion: "RAFAEL URIBE URIBE", valor: 18},
  {descripcion: "CIUDAD BOLIVAR", valor: 19},
  {descripcion: "FUERA DE BOGOTA", valor:	20},
  {descripcion: "SIN LOCALIDAD", valor:	21}
]

export const bdTipoColegio: IInputRules[] = [
  {descripcion: "NO REGISTRA", valor:	0},
  {descripcion: "OFICIAL", valor:	1},
  {descripcion: "NO OFICIAL", valor: 2}
]

export const bdCalendarioColegio: IInputRules[] = [
  {descripcion: "NO REGISTRA", valor:	0},
  {descripcion: "A", valor:	1},
  {descripcion: "B", valor:	2},
  {descripcion: "F", valor:	3}
]

export const bdDepartamento: IInputRules[] = [
  {descripcion: "NO REGISTRA", valor:	0},
  {descripcion: "AMAZONAS", valor:	1},
  {descripcion: "ANTIOQUIA", valor:	2},
  {descripcion: "ARAUCA", valor:	3},
  {descripcion: "ATLANTICO", valor:	4},
  {descripcion: "BOGOTA", valor:	5},
  {descripcion: "BOLIVAR", valor:	6},
  {descripcion: "BOYACA", valor:	7},
  {descripcion: "CALDAS", valor:	8},
  {descripcion: "CAQUETA", valor:	9},
  {descripcion: "CASANARE", valor:	10},
  {descripcion: "CAUCA", valor:	11},
  {descripcion: "CESAR", valor:	12},
  {descripcion: "CHOCO", valor:	13},
  {descripcion: "CORDOBA", valor:	14},
  {descripcion: "CUNDINAMARCA", valor:	15},
  {descripcion: "GUAINIA", valor:	16},
  {descripcion: "GUAVIARE", valor:	17},
  {descripcion: "HUILA", valor:	18},
  {descripcion: "LA GUAJIRA", valor:	19},
  {descripcion: "MAGDALENA", valor:	20},
  {descripcion: "META", valor:	21},
  {descripcion: "NARINO", valor:	22},
  {descripcion: "NORTE SANTANDER", valor:	23},
  {descripcion: "PUTUMAYO", valor:	24},
  {descripcion: "QUINDIO", valor:	25},
  {descripcion: "RISARALDA", valor:	26},
  {descripcion: "SAN ANDRES Y PROVIDENCIA", valor:	27},
  {descripcion: "SANTANDER", valor:	28},
  {descripcion: "SUCRE", valor:	29},
  {descripcion: "TOLIMA", valor:	30},
  {descripcion: "VALLE", valor:	31},
  {descripcion: "VAUPES", valor:	32},
  {descripcion: "VICHADA", valor:	33}
]

export const bdMunicipio: IInputRules[] = [
{descripcion: "NO REGISTRA", valor: 0},
{descripcion: "ACACIAS", valor: 1},
{descripcion: "AGUACHICA", valor: 2},
{descripcion: "AGUAZUL", valor: 3},
{descripcion: "ALBAN", valor: 4},
{descripcion: "ALBAN (SAN JOSE)", valor: 5},
{descripcion: "ALVARADO", valor: 6},
{descripcion: "ANAPOIMA", valor: 7},
{descripcion: "ANOLAIMA", valor: 8},
{descripcion: "APARTADO", valor: 9},
{descripcion: "ARAUCA", valor: 10},
{descripcion: "ARBELAEZ", valor: 11},
{descripcion: "ARMENIA", valor: 12},
{descripcion: "ATACO", valor: 13},
{descripcion: "BARRANCABERMEJA", valor: 14},
{descripcion: "BARRANQUILLA", valor: 16},
{descripcion: "BELEN DE LOS ANDAQUIES", valor: 17},
{descripcion: "BOAVITA", valor: 18},
{descripcion: "BOGOTA", valor: 19},
{descripcion: "BOJACA", valor: 20},
{descripcion: "BOLIVAR", valor: 21},
{descripcion: "BUCARAMANGA", valor: 22},
{descripcion: "BUENAVENTURA", valor: 23},
{descripcion: "CABUYARO", valor: 24},
{descripcion: "CACHIPAY", valor: 25},
{descripcion: "CAICEDONIA", valor: 26},
{descripcion: "CAJAMARCA", valor: 27},
{descripcion: "CAJICA", valor: 28},
{descripcion: "CALAMAR", valor: 29},
{descripcion: "CALARCA", valor: 30},
{descripcion: "CALI", valor: 31},
{descripcion: "CAMPOALEGRE", valor: 32},
{descripcion: "CAPARRAPI", valor: 33},
{descripcion: "CAQUEZA", valor: 34},
{descripcion: "CARTAGENA", valor: 35},
{descripcion: "CASTILLA LA NUEVA", valor: 36},
{descripcion: "CERETE", valor: 37},
{descripcion: "CHAPARRAL", valor: 38},
{descripcion: "CHARALA", valor: 39},
{descripcion: "CHIA", valor: 40},
{descripcion: "CHIPAQUE", valor: 41},
{descripcion: "CHIQUINQUIRA", valor: 42},
{descripcion: "CHOACHI", valor: 43},
{descripcion: "CHOCONTA", valor: 44},
{descripcion: "CIENAGA", valor: 45},
{descripcion: "CIRCASIA", valor: 46},
{descripcion: "COGUA", valor: 47},
{descripcion: "CONTRATACION", valor: 48},
{descripcion: "COTA", valor: 49},
{descripcion: "CUCUTA", valor: 50},
{descripcion: "CUMARAL", valor: 51},
{descripcion: "CUMBAL", valor: 52},
{descripcion: "CURITI", valor: 53},
{descripcion: "CURUMANI", valor: 54},
{descripcion: "DUITAMA", valor: 55},
{descripcion: "EL BANCO", valor: 56},
{descripcion: "EL CARMEN DE BOLIVAR", valor: 57},
{descripcion: "EL COLEGIO", valor: 58},
{descripcion: "EL CHARCO", valor: 59},
{descripcion: "EL DORADO", valor: 60},
{descripcion: "EL PASO", valor: 61},
{descripcion: "EL ROSAL", valor: 62},
{descripcion: "ESPINAL", valor: 63},
{descripcion: "FACATATIVA", valor: 64},
{descripcion: "FLORENCIA", valor: 65},
{descripcion: "FLORIDABLANCA", valor: 66},
{descripcion: "FOMEQUE", valor: 67},
{descripcion: "FONSECA", valor: 68},
{descripcion: "FORTUL", valor: 69},
{descripcion: "FOSCA", valor: 70},
{descripcion: "FUNZA", valor: 71},
{descripcion: "FUSAGASUGA", valor: 72},
{descripcion: "GACHETA", valor: 73},
{descripcion: "GALERAS (NUEVA GRANADA)", valor: 74},
{descripcion: "GAMA", valor: 75},
{descripcion: "GARAGOA", valor: 76},
{descripcion: "GARZON", valor: 77},
{descripcion: "GIGANTE", valor: 78},
{descripcion: "GIRARDOT", valor: 79},
{descripcion: "GRANADA", valor: 80},
{descripcion: "GUACHUCAL", valor: 81},
{descripcion: "GUADUAS", valor: 82},
{descripcion: "GUAITARILLA", valor: 83},
{descripcion: "GUAMO", valor: 84},
{descripcion: "GUASCA", valor: 85},
{descripcion: "GUATEQUE", valor: 86},
{descripcion: "GUAYATA", valor: 87},
{descripcion: "GUTIERREZ", valor: 88},
{descripcion: "IBAGUE", valor: 89},
{descripcion: "INIRIDA", valor: 90},
{descripcion: "INZA", valor: 91},
{descripcion: "IPIALES", valor: 92},
{descripcion: "ITSMINA", valor: 93},
{descripcion: "JENESANO", valor: 94},
{descripcion: "LA CALERA", valor: 95},
{descripcion: "LA DORADA", valor: 96},
{descripcion: "LA MESA", valor: 98},
{descripcion: "LA PLATA", valor: 99},
{descripcion: "LA UVITA", valor: 100},
{descripcion: "LA VEGA", valor: 101},
{descripcion: "LIBANO", valor: 102},
{descripcion: "LOS PATIOS", valor: 103},
{descripcion: "MACANAL", valor: 104},
{descripcion: "MACHETA", valor: 105},
{descripcion: "MADRID", valor: 106},
{descripcion: "MAICAO", valor: 107},
{descripcion: "MALAGA", valor: 108},
{descripcion: "MANAURE BALCON DEL 12", valor: 109},
{descripcion: "MANIZALES", valor: 110},
{descripcion: "MARIQUITA", valor: 111},
{descripcion: "MEDELLIN", valor: 112},
{descripcion: "MEDINA", valor: 113},
{descripcion: "MELGAR", valor: 114},
{descripcion: "MITU", valor: 115},
{descripcion: "MOCOA", valor: 116},
{descripcion: "MONTERIA", valor: 117},
{descripcion: "MONTERREY", valor: 118},
{descripcion: "MOSQUERA", valor: 119},
{descripcion: "NATAGAIMA", valor: 120},
{descripcion: "NEIVA", valor: 121},
{descripcion: "NEMOCON", valor: 122},
{descripcion: "OCANA", valor: 123},
{descripcion: "ORITO", valor: 124},
{descripcion: "ORTEGA", valor: 125},
{descripcion: "PACHO", valor: 126},
{descripcion: "PAEZ (BELALCAZAR)", valor: 127},
{descripcion: "PAICOL", valor: 128},
{descripcion: "PAILITAS", valor: 129},
{descripcion: "PAIPA", valor: 130},
{descripcion: "PALERMO", valor: 131},
{descripcion: "PALMIRA", valor: 132},
{descripcion: "PAMPLONA", valor: 133},
{descripcion: "PANDI", valor: 134},
{descripcion: "PASCA", valor: 135},
{descripcion: "PASTO", valor: 136},
{descripcion: "PAZ DE ARIPORO", valor: 137},
{descripcion: "PAZ DE RIO", valor: 138},
{descripcion: "PITALITO", valor: 139},
{descripcion: "POPAYAN", valor: 140},
{descripcion: "PUENTE NACIONAL", valor: 141},
{descripcion: "PUERTO ASIS", valor: 142},
{descripcion: "PUERTO BOYACA", valor: 143},
{descripcion: "PUERTO LOPEZ", valor: 144},
{descripcion: "PUERTO SALGAR", valor: 145},
{descripcion: "PURIFICACION", valor: 146},
{descripcion: "QUETAME", valor: 147},
{descripcion: "QUIBDO", valor: 148},
{descripcion: "RAMIRIQUI", valor: 149},
{descripcion: "RICAURTE", valor: 150},
{descripcion: "RIOHACHA", valor: 151},
{descripcion: "RIVERA", valor: 152},
{descripcion: "SABOYA", valor: 153},
{descripcion: "SAHAGUN", valor: 154},
{descripcion: "SALDAÑA", valor: 155},
{descripcion: "SAMACA", valor: 156},
{descripcion: "SAMANA", valor: 157},
{descripcion: "SAN AGUSTIN", valor: 158},
{descripcion: "SAN ANDRES", valor: 159},
{descripcion: "SAN BERNARDO", valor: 160},
{descripcion: "SAN EDUARDO", valor: 161},
{descripcion: "SAN FRANCISCO", valor: 162},
{descripcion: "SAN GIL", valor: 163},
{descripcion: "SAN JOSE DEL FRAGUA", valor: 164},
{descripcion: "SAN JOSE DEL GUAVIARE", valor: 165},
{descripcion: "SAN LUIS DE PALENQUE", valor: 166},
{descripcion: "SAN MARCOS", valor: 167},
{descripcion: "SAN MARTIN", valor: 168},
{descripcion: "SANDONA", valor: 169},
{descripcion: "SAN VICENTE DEL CAGUAN", valor: 170},
{descripcion: "SANTA MARTA", valor: 171},
{descripcion: "SANTA SOFIA", valor: 172},
{descripcion: "SESQUILE", valor: 173},
{descripcion: "SIBATE", valor: 174},
{descripcion: "SIBUNDOY", valor: 175},
{descripcion: "SILVANIA", valor: 176},
{descripcion: "SIMIJACA", valor: 177},
{descripcion: "SINCE", valor: 178},
{descripcion: "SINCELEJO", valor: 179},
{descripcion: "SOACHA", valor: 180},
{descripcion: "SOATA", valor: 181},
{descripcion: "SOCORRO", valor: 182},
{descripcion: "SOGAMOSO", valor: 183},
{descripcion: "SOLEDAD", valor: 184},
{descripcion: "SOPO", valor: 185},
{descripcion: "SORACA", valor: 186},
{descripcion: "SOTAQUIRA", valor: 187},
{descripcion: "SUAITA", valor: 188},
{descripcion: "SUBACHOQUE", valor: 189},
{descripcion: "SUESCA", valor: 190},
{descripcion: "SUPATA", valor: 191},
{descripcion: "SUTAMARCHAN", valor: 192},
{descripcion: "SUTATAUSA", valor: 193},
{descripcion: "TABIO", valor: 194},
{descripcion: "TAMESIS", valor: 195},
{descripcion: "TARQUI", valor: 196},
{descripcion: "TAUSA", valor: 197},
{descripcion: "TENA", valor: 198},
{descripcion: "TENJO", valor: 199},
{descripcion: "TESALIA", valor: 200},
{descripcion: "TIBANA", valor: 201},
{descripcion: "TIMANA", valor: 202},
{descripcion: "TOCANCIPA", valor: 203},
{descripcion: "TUBARA", valor: 204},
{descripcion: "TULUA", valor: 205},
{descripcion: "TUMACO", valor: 206},
{descripcion: "TUNJA", valor: 207},
{descripcion: "TURBACO", valor: 208},
{descripcion: "TURMEQUE", valor: 209},
{descripcion: "UBATE", valor: 210},
{descripcion: "UMBITA", valor: 211},
{descripcion: "UNE", valor: 212},
{descripcion: "VALLEDUPAR", valor: 213},
{descripcion: "VELEZ", valor: 214},
{descripcion: "VENADILLO", valor: 215},
{descripcion: "VENECIA (OSPINA PEREZ)", valor: 216},
{descripcion: "VILLA DE LEYVA", valor: 217},
{descripcion: "VILLAHERMOSA", valor: 218},
{descripcion: "VILLANUEVA", valor: 219},
{descripcion: "VILLAPINZON", valor: 220},
{descripcion: "VILLAVICENCIO", valor: 221},
{descripcion: "VILLETA", valor: 222},
{descripcion: "YACOPI", valor: 223},
{descripcion: "YOPAL", valor: 224},
{descripcion: "ZIPACON", valor: 225},
{descripcion: "ZIPAQUIRA", valor: 226},

]
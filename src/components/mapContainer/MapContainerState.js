import {atom} from "recoil";


export const mapContainerState = atom({
    key: 'mapContainer',
    default: {
        //test
        AFG: {NAME: 'Afghanistan', Population: 5459642, Susceptible: 5459638, Infectious:4, Recovered:0, Deceased:0, beta:0.240961, gamma:0.0195558, delta:0.00925, infectivity:1},

        // AFG: {NAME: 'Afghanistan', Population: 38928346, Susceptible: 38928345, Infectious:1, Recovered:0, Deceased:0, beta:4, gamma:1, delta:1, infectivity:1},
        ALB: {NAME: 'Albania', Population: 2877797, Susceptible: 2877797, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        DZA: {NAME: 'Algeria', Population: 43851044, Susceptible: 43851044, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        AND: {NAME: 'Andorra', Population: 77265, Susceptible: 77265, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        AGO: {NAME: 'Angola', Population: 32866272, Susceptible: 32866272, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        ATG: {NAME: 'Antigua and Barbuda', Population: 97929, Susceptible: 97929, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        ARG: {NAME: 'Argentina', Population: 45195774, Susceptible: 45195774, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        ARM: {NAME: 'Armenia', Population: 2963243, Susceptible: 2963243, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        AUS: {NAME: 'Australia', Population: 25499884, Susceptible: 25499884, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        AUT: {NAME: 'Austria', Population: 9006398, Susceptible: 9006398, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        AZE: {NAME: 'Azerbaijan', Population: 10139177, Susceptible: 10139177, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        BHS: {NAME: 'Bahamas', Population: 393244, Susceptible: 393244, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        BHR: {NAME: 'Bahrain', Population: 1701575, Susceptible: 1701575, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        BGD: {NAME: 'Bangladesh', Population: 164689383, Susceptible: 164689383, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        BRB: {NAME: 'Barbados', Population: 287375, Susceptible: 287375, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        BLR: {NAME: 'Belarus', Population: 9449323, Susceptible: 9449323, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        BEL: {NAME: 'Belgium', Population: 1589623, Susceptible: 1589623, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        BLZ: {NAME: 'Belize', Population: 397628, Susceptible: 397628, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        BEN: {NAME: 'Benin', Population: 12123200, Susceptible: 12123200, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        BTN: {NAME: 'Bhutan', Population: 771608, Susceptible: 771608, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        BOL: {NAME: 'Bolivia', Population: 11673021, Susceptible: 11673021, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        BIH: {NAME: 'Bosnia and Herzegovina', Population: 3280819, Susceptible: 3280819, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        BWA: {NAME: 'Botswana', Population: 2351627, Susceptible: 2351627, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        BRA: {NAME: 'Brazil', Population: 212559417, Susceptible: 212559417, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        BRN: {NAME: 'Brunei Darussalam', Population: 437479, Susceptible: 437479, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        BGR: {NAME: 'Bulgaria', Population: 6948445, Susceptible: 6948445, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        BFA: {NAME: 'Burkina Faso', Population: 20903273, Susceptible: 20903273, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        BDI: {NAME: 'Burundi', Population: 11890784, Susceptible: 11890784, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        // duplikat
        // KHM: {NAME: 'Cambodia', Population: 16718965, Susceptible: 16718965, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        KHM: {NAME: 'Cameroon', Population: 26545863, Susceptible: 26545863, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        CAN: {NAME: 'Canada', Population: 37742154, Susceptible: 37742154, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        CPV: {NAME: 'Cape Verde', Population: 543767, Susceptible: 543767, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        CAF: {NAME: 'Central African Republic', Population: 4829767, Susceptible: 4829767, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        TCD: {NAME: 'Chad', Population: 16425864, Susceptible: 16425864, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        CHL: {NAME: 'Chile', Population: 19116201, Susceptible: 19116201, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        CHN: {NAME: 'China', Population: 1439323776, Susceptible: 1439323776, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        COL: {NAME: 'Colombia', Population: 50882891, Susceptible: 50882891, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        COM: {NAME: 'Comoros', Population: 869601, Susceptible: 869601, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        COG: {NAME: 'Congo', Population: 5518087, Susceptible: 5518087, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        COD: {NAME: 'Democratic Republic of Congo', Population: 89561403, Susceptible: 89561403, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        CRI: {NAME: 'Costa Rica', Population: 5094118, Susceptible: 5094118, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        CIV: {NAME: 'Cote d\'Ivoire', Population: 26378274, Susceptible: 26378274, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        HRV: {NAME: 'Croatia', Population: 4105267, Susceptible: 4105267, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        CUB: {NAME: 'Cuba', Population: 11326616, Susceptible: 11326616, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        CYP: {NAME: 'Cyprus', Population: 1207359, Susceptible: 1207359, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        CZE: {NAME: 'Czech Republic', Population: 10708981, Susceptible: 10708981, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        DNK: {NAME: 'Denmark', Population: 5792202, Susceptible: 5792202, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        DJI: {NAME: 'Djibouti', Population: 988000, Susceptible: 988000, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        DMA: {NAME: 'Dominica', Population: 71986, Susceptible: 71986, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        DOM: {NAME: 'Dominican Republic', Population: 10847910, Susceptible: 10847910, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        ECU: {NAME: 'Ecuador', Population: 17643054, Susceptible: 17643054, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        EGY: {NAME: 'Egypt', Population: 102334404, Susceptible: 102334404, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        SLV: {NAME: 'El Salvador', Population: 6486205, Susceptible: 6486205, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        GNQ: {NAME: 'Equatorial Guinea', Population: 1402985, Susceptible: 1402985, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        ERI: {NAME: 'Eritrea', Population: 3546421, Susceptible: 3546421, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        EST: {NAME: 'Estonia', Population: 1326535, Susceptible: 1326535, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        ETH: {NAME: 'Ethiopia', Population: 114963588, Susceptible: 114963588, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        FJI: {NAME: 'Fiji', Population: 896445, Susceptible: 896445, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        FIN: {NAME: 'Finland', Population: 5540720, Susceptible: 5540720, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        FRA: {NAME: 'France', Population: 65273511, Susceptible: 65273511, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        GAB: {NAME: 'Gabon', Population: 2225734, Susceptible: 2225734, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        GMB: {NAME: 'Gambia', Population: 2416668, Susceptible: 2416668, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        GEO: {NAME: 'Georgia', Population: 3989167, Susceptible: 3989167, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        DEU: {NAME: 'Germany', Population: 83783942, Susceptible: 83783942, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        GHA: {NAME: 'Ghana', Population: 31072940, Susceptible: 31072940, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        GRC: {NAME: 'Greece', Population: 10423054, Susceptible: 10423054, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        GRD: {NAME: 'Grenada', Population: 112523, Susceptible: 112523, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        GTM: {NAME: 'Guatemala', Population: 17915568, Susceptible: 17915568, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        GIN: {NAME: 'Guinea', Population: 13132795, Susceptible: 13132795, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        GNB: {NAME: 'Guinea-Bissau', Population: 1968001, Susceptible: 1968001, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        GUY: {NAME: 'Guyana', Population: 786552, Susceptible: 786552, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        HTI: {NAME: 'Haiti', Population: 11402528, Susceptible: 11402528, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        HND: {NAME: 'Honduras', Population: 9904607, Susceptible: 9904607, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        HUN: {NAME: 'Hungary', Population: 9660351, Susceptible: 9660351, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        ISL: {NAME: 'Iceland', Population: 341243, Susceptible: 341243, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        IND: {NAME: 'India', Population: 1380004385, Susceptible: 1380004385, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        IDN: {NAME: 'Indonesia', Population: 273523615, Susceptible: 273523615, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        IRN: {NAME: 'Iran', Population: 83992949, Susceptible: 83992949, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        IRQ: {NAME: 'Iraq', Population: 40222493, Susceptible: 40222493, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        IRL: {NAME: 'Ireland', Population: 4937786, Susceptible: 4937786, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        ISR: {NAME: 'Israel', Population: 8655535, Susceptible: 8655535, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        ITA: {NAME: 'Italy', Population: 60461826, Susceptible: 60461826, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        JAM: {NAME: 'Jamaica', Population: 2961167, Susceptible: 2961167, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        JPN: {NAME: 'Japan', Population: 126476461, Susceptible: 126476461, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        JOR: {NAME: 'Jordan', Population: 10203134, Susceptible: 10203134, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        KAZ: {NAME: 'Kazakhstan', Population: 18776707, Susceptible: 18776707, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        KEN: {NAME: 'Kenya', Population: 53771296, Susceptible: 53771296, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        KIR: {NAME: 'Kiribati', Population: 119449, Susceptible: 119449, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        PRK: {NAME: 'North Korea', Population: 25778816, Susceptible: 25778816, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        KOR: {NAME: 'South Korea', Population: 51269185, Susceptible: 51269185, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        KWT: {NAME: 'Kuwait', Population: 4270571, Susceptible: 4270571, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        KGZ: {NAME: 'Kyrgyzstan', Population: 6524195, Susceptible: 6524195, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        LAO: {NAME: 'Laos', Population: 7275560, Susceptible: 7275560, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        LVA: {NAME: 'Latvia', Population: 1886198, Susceptible: 1886198, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        LBN: {NAME: 'Lebanon', Population: 6825445, Susceptible: 6825445, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        LSO: {NAME: 'Lesotho', Population: 2142249, Susceptible: 2142249, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        LBR: {NAME: 'Liberia', Population: 5057681, Susceptible: 5057681, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        LBY: {NAME: 'Libyan Arab Jamahiriya', Population: 6871292, Susceptible: 6871292, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        LIE: {NAME: 'Liechtenstein', Population: 38128, Susceptible: 38128, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        LTU: {NAME: 'Lithuania', Population: 2722289, Susceptible: 2722289, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        LUX: {NAME: 'Luxembourg', Population: 625978, Susceptible: 625978, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        MKD: {NAME: 'Macedonia', Population: 2083374, Susceptible: 2083374, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        MDG: {NAME: 'Madagascar', Population: 27691018, Susceptible: 27691018, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        MWI: {NAME: 'Malawi', Population: 19129952, Susceptible: 19129952, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        MYS: {NAME: 'Malaysia', Population: 32365999, Susceptible: 32365999, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        MDV: {NAME: 'Maldives', Population: 540544, Susceptible: 540544, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        MLI: {NAME: 'Mali', Population: 20250833, Susceptible: 20250833, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        MLT: {NAME: 'Malta', Population: 441543, Susceptible: 441543, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        MHL: {NAME: 'Marshall Islands', Population: 59190, Susceptible: 59190, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        MRT: {NAME: 'Mauritania', Population: 4649658, Susceptible: 4649658, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        MUS: {NAME: 'Mauritius', Population: 1271768, Susceptible: 1271768, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        MEX: {NAME: 'Mexico', Population: 128932753, Susceptible: 128932753, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        FSM: {NAME: 'Federated States of Micronesia', Population: 548914, Susceptible: 548914, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        MDA: {NAME: 'Moldova', Population: 4033963, Susceptible: 4033963, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        MCO: {NAME: 'Monaco', Population: 39242, Susceptible: 39242, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        MNG: {NAME: 'Mongolia', Population: 3278290, Susceptible: 3278290, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        MNE: {NAME: 'Montenegro', Population: 628066, Susceptible: 628066, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        MAR: {NAME: 'Morocco', Population: 36910560, Susceptible: 36910560, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        MOZ: {NAME: 'Mozambique', Population: 31255435, Susceptible: 31255435, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        MMR: {NAME: 'Myanmar', Population: 54409800, Susceptible: 54409800, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        NAM: {NAME: 'Namibia', Population: 2540905, Susceptible: 2540905, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        NRU: {NAME: 'Nauru', Population: 10824, Susceptible: 10824, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        NPL: {NAME: 'Nepal', Population: 29136808, Susceptible: 29136808, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        NLD: {NAME: 'Netherlands', Population: 17134872, Susceptible: 17134872, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        NZL: {NAME: 'New Zealand', Population: 4822233, Susceptible: 4822233, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        NIC: {NAME: 'Nicaragua', Population: 6624554, Susceptible: 6624554, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        NER: {NAME: 'Niger', Population: 24206644, Susceptible: 24206644, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        NGA: {NAME: 'Nigeria', Population: 206139589, Susceptible: 206139589, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        NOR: {NAME: 'Norway', Population: 5421241, Susceptible: 5421241, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        OMN: {NAME: 'Oman', Population: 5106626, Susceptible: 5106626, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        PAK: {NAME: 'Pakistan', Population: 220892340, Susceptible: 220892340, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        PLW: {NAME: 'Palau', Population: 18094, Susceptible: 18094, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        PAN: {NAME: 'Panama', Population: 4314767, Susceptible: 4314767, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        PNG: {NAME: 'Papua New Guinea', Population: 8947024, Susceptible: 8947024, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        PRY: {NAME: 'Paraguay', Population: 7132538, Susceptible: 7132538, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        PER: {NAME: 'Peru', Population: 32971854, Susceptible: 32971854, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        PHL: {NAME: 'Philippines', Population: 109581078, Susceptible: 109581078, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        POL: {NAME: 'Poland', Population: 37846611, Susceptible: 37846611, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        PRT: {NAME: 'Portugal', Population: 10196709, Susceptible: 10196709, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        QAT: {NAME: 'Qatar', Population: 2881053, Susceptible: 2881053, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        ROU: {NAME: 'Romania', Population: 19237691, Susceptible: 19237691, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        RUS: {NAME: 'Russian Federation', Population: 145934462, Susceptible: 145934462, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        RWA: {NAME: 'Rwanda', Population: 12952218, Susceptible: 12952218, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        KNA: {NAME: 'Saint Kitts and Nevis', Population: 53199, Susceptible: 53199, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        LCA: {NAME: 'Saint Lucia', Population: 183627, Susceptible: 183627, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        VCT: {NAME: 'Saint Vincent and the Grenadines', Population: 110210, Susceptible: 110210, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        WSM: {NAME: 'Samoa', Population: 196130, Susceptible: 196130, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        SMR: {NAME: 'San Marino', Population: 33931, Susceptible: 33931, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        STP: {NAME: 'Sao Tome and Principe', Population: 219159, Susceptible: 219159, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        SAU: {NAME: 'Saudi Arabia', Population: 34813871, Susceptible: 34813871, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        SEN: {NAME: 'Senegal', Population: 16743927, Susceptible: 16743927, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        SRB: {NAME: 'Serbia', Population: 8737371, Susceptible: 8737371, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        SYC: {NAME: 'Seychelles', Population: 98347, Susceptible: 98347, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        SLE: {NAME: 'Sierra Leone', Population: 7976983, Susceptible: 7976983, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        SGP: {NAME: 'Singapore', Population: 5850342, Susceptible: 5850342, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        SVK: {NAME: 'Slovakia', Population: 5459642, Susceptible: 5459642, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        SVN: {NAME: 'Slovenia', Population: 2078938, Susceptible: 2078938, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        SLB: {NAME: 'Solomon Islands', Population: 686884, Susceptible: 686884, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        SOM: {NAME: 'Somalia', Population: 15893222, Susceptible: 15893222, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        ZAF: {NAME: 'South Africa', Population: 59308690, Susceptible: 59308690, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        ESP: {NAME: 'Spain', Population: 46754778, Susceptible: 46754778, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        LKA: {NAME: 'Sri Lanka', Population: 21413249, Susceptible: 21413249, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        SDN: {NAME: 'Sudan', Population: 43849260, Susceptible: 43849260, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        SUR: {NAME: 'Suriname', Population: 586632, Susceptible: 586632, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        SWZ: {NAME: 'Swaziland', Population: 1167123, Susceptible: 1167123, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        SWE: {NAME: 'Sweden', Population: 10099265, Susceptible: 10099265, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        CHE: {NAME: 'Switzerland', Population: 8654622, Susceptible: 8654622, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        SYR: {NAME: 'Syrian Arab Republic', Population: 17500658, Susceptible: 17500658, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        TJK: {NAME: 'Tajikistan', Population: 9537645, Susceptible: 9537645, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        TZA: {NAME: 'Tanzania', Population: 59734218, Susceptible: 59734218, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        THA: {NAME: 'Thailand', Population: 69799978, Susceptible: 69799978, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        TLS: {NAME: 'Timor-Leste', Population: 1318445, Susceptible: 1318445, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        TGO: {NAME: 'Togo', Population: 8278724, Susceptible: 8278724, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        TON: {NAME: 'Tonga', Population: 105695, Susceptible: 105695, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        TTO: {NAME: 'Trinidad and Tobago', Population: 1399488, Susceptible: 1399488, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        TUN: {NAME: 'Tunisia', Population: 11818619, Susceptible: 11818619, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        TUR: {NAME: 'Turkey', Population: 84339067, Susceptible: 84339067, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        TKM: {NAME: 'Turkmenistan', Population: 6031200, Susceptible: 6031200, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        TUV: {NAME: 'Tuvalu', Population: 11792, Susceptible: 11792, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        UGA: {NAME: 'Uganda', Population: 45741007, Susceptible: 45741007, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        UKR: {NAME: 'Ukraine', Population: 43733762, Susceptible: 43733762, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        ARE: {NAME: 'United Arab Emirates', Population: 9890402, Susceptible: 9890402, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        GBR: {NAME: 'United Kingdom', Population: 67886011, Susceptible: 67886011, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        USA: {NAME: 'United States', Population: 331002651, Susceptible: 331002651, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        URY: {NAME: 'Uruguay', Population: 3473730, Susceptible: 3473730, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        UZB: {NAME: 'Uzbekistan', Population: 33469203, Susceptible: 33469203, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        VUT: {NAME: 'Vanuatu', Population: 307145, Susceptible: 307145, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        VEN: {NAME: 'Venezuela', Population: 28435940, Susceptible: 28435940, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        VNM: {NAME: 'Viet Nam', Population: 97338579, Susceptible: 97338579, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        YEM: {NAME: 'Yemen', Population: 29825964, Susceptible: 29825964, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        ZMB: {NAME: 'Zambia', Population: 18383955, Susceptible: 18383955, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        ZWE: {NAME: 'Zimbabwe', Population: 14862924, Susceptible: 14862924, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},

        ATF: {NAME: 'French Southern and Antarctic Lands', Population: 366, Susceptible: 366, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        GRL: {NAME: 'Greenland', Population: 56025, Susceptible: 56025, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        PRI: {NAME: 'Puerto Rico', Population: 2860853, Susceptible: 2860853, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        FLK: {NAME: 'Falkland Islands', Population: 2840, Susceptible: 2840, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        ESH: {NAME: 'Western Sahara', Population: 597339, Susceptible: 597339, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        CMR: {NAME: 'Cameroon', Population: 26545863, Susceptible: 26545863, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        SSD: {NAME: 'South Sudan', Population: 11193725, Susceptible: 11193725, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        NCL: {NAME: 'New Caledonia', Population: 284060, Susceptible: 284060, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        TWN: {NAME: 'Taiwan', Population: 23816775, Susceptible: 23816775, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},
        PSE: {NAME: 'Palestine', Population: 5101414, Susceptible: 5101414, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0},

        ['-99']: {NAME: 'Somalia', Population: 15893222, Susceptible: 15893222, Infectious:0, Recovered:0, Deceased:0, beta:0, gamma:0, delta:0, infectivity:0}
    },
});


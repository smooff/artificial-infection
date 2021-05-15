import {atom, selector} from "recoil";


export const mapContainerState = atom({
    key: 'mapContainer',
    default: {
        //205 krajin
        //chybaju tu - Honk Kong (HKG), Gibraltar (GIB), Vatikan(VAT), Makao (MAC)
        //info - hranice/region/subregion https://raw.githubusercontent.com/mledoze/countries/master/countries.json
        //regiony: Asia, Europe, Africa, Americas, Oceania

        AFG: {
            NAME: 'Afghanistan',
            Population: 38928346,
            Susceptible: 38928346,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'IRN',
                'PAK',
                'TKM',
                'UZB',
                'TJK',
                'CHN'
            ],
            region: 'Asia',
            subregion: 'Southern Asia'
        },
        ALB: {
            NAME: 'Albania',
            Population: 2877797,
            Susceptible: 2877797,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'MNE',
                'GRC',
                'MKD',
                'UNK'
            ],
            region: 'Europe',
            subregion: 'Southern Europe'
        },
        DZA: {
            NAME: 'Algeria',
            Population: 43851044,
            Susceptible: 43851044,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'TUN',
                'LBY',
                'NER',
                'ESH',
                'MRT',
                'MLI',
                'MAR'
            ],
            region: 'Africa',
            subregion: 'Northern Africa'
        },
        AND: {
            NAME: 'Andorra',
            Population: 77265,
            Susceptible: 77265,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'FRA',
                'ESP'
            ],
            region: 'Europe',
            subregion: 'Southern Europe'
        },
        AGO: {
            NAME: 'Angola',
            Population: 32866272,
            Susceptible: 32866272,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'COG',
                'COD',
                'ZMB',
                'NAM'
            ],
            region: 'Africa',
            subregion: 'Middle Africa'
        },
        ATG: {
            NAME: 'Antigua and Barbuda',
            Population: 97929,
            Susceptible: 97929,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [],
            region: 'Americas',
            subregion: 'Caribbean'
        },
        ARG: {
            NAME: 'Argentina',
            Population: 45195774,
            Susceptible: 45195774,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'BOL',
                'BRA',
                'CHL',
                'PRY',
                'URY'
            ],
            region: 'Americas',
            subregion: 'South America'
        },
        ARM: {
            NAME: 'Armenia',
            Population: 2963243,
            Susceptible: 2963243,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'AZE',
                'GEO',
                'IRN',
                'TUR'
            ],
            region: 'Asia',
            subregion: 'Western Asia'
        },
        AUS: {
            NAME: 'Australia',
            Population: 25499884,
            Susceptible: 25499884,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [],
            region: 'Oceania',
            subregion: 'Australia and New Zealand'
        },
        AUT: {
            NAME: 'Austria',
            Population: 9006398,
            Susceptible: 9006398,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'CZE',
                'DEU',
                'HUN',
                'ITA',
                'LIE',
                'SVK',
                'SVN',
                'CHE'
            ],
            region: 'Europe',
            subregion: 'Western Europe'
        },
        AZE: {
            NAME: 'Azerbaijan',
            Population: 10139177,
            Susceptible: 10139177,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'ARM',
                'GEO',
                'IRN',
                'RUS',
                'TUR'
            ],
            region: 'Asia',
            subregion: 'Western Asia'
        },
        BHS: {
            NAME: 'Bahamas',
            Population: 393244,
            Susceptible: 393244,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [],
            region: 'Americas',
            subregion: 'Caribbean'
        },
        BHR: {
            NAME: 'Bahrain',
            Population: 1701575,
            Susceptible: 1701575,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [],
            region: 'Asia',
            subregion: 'Western Asia'
        },
        BGD: {
            NAME: 'Bangladesh',
            Population: 164689383,
            Susceptible: 164689383,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'MMR',
                'IND'
            ],
            region: 'Asia',
            subregion: 'Southern Asia'
        },
        BRB: {
            NAME: 'Barbados',
            Population: 287375,
            Susceptible: 287375,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [],
            region: 'Americas',
            subregion: 'Caribbean'
        },
        BLR: {
            NAME: 'Belarus',
            Population: 9449323,
            Susceptible: 9449323,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'LVA',
                'LTU',
                'POL',
                'RUS',
                'UKR'
            ],
            region: 'Europe',
            subregion: 'Eastern Europe'
        },
        BEL: {
            NAME: 'Belgium',
            Population: 1589623,
            Susceptible: 1589623,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'FRA',
                'DEU',
                'LUX',
                'NLD'
            ],
            region: 'Europe',
            subregion: 'Western Europe'
        },
        BLZ: {
            NAME: 'Belize',
            Population: 397628,
            Susceptible: 397628,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'GTM',
                'MEX'
            ],
            region: 'Americas',
            subregion: 'Central America'
        },
        BEN: {
            NAME: 'Benin',
            Population: 12123200,
            Susceptible: 12123200,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'BFA',
                'NER',
                'NGA',
                'TGO'
            ],
            region: 'Africa',
            subregion: 'Western Africa'
        },
        BTN: {
            NAME: 'Bhutan',
            Population: 771608,
            Susceptible: 771608,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'CHN',
                'IND'
            ],
            region: 'Asia',
            subregion: 'Southern Asia'
        },
        BOL: {
            NAME: 'Bolivia',
            Population: 11673021,
            Susceptible: 11673021,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'ARG',
                'BRA',
                'CHL',
                'PRY',
                'PER'
            ],
            region: 'Americas',
            subregion: 'South America'
        },
        BIH: {
            NAME: 'Bosnia and Herzegovina',
            Population: 3280819,
            Susceptible: 3280819,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'HRV',
                'MNE',
                'SRB'
            ],
            region: 'Europe',
            subregion: 'Southern Europe'
        },
        BWA: {
            NAME: 'Botswana',
            Population: 2351627,
            Susceptible: 2351627,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'NAM',
                'ZAF',
                'ZMB',
                'ZWE'
            ],
            region: 'Africa',
            subregion: 'Southern Africa'
        },
        BRA: {
            NAME: 'Brazil',
            Population: 212559417,
            Susceptible: 212559417,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'ARG',
                'BOL',
                'COL',
                'GUY',
                'PRY',
                'PER',
                'SUR',
                'URY',
                'VEN',
                'GUF'
            ],
            region: 'Americas',
            subregion: 'South America'
        },
        BRN: {
            NAME: 'Brunei Darussalam',
            Population: 437479,
            Susceptible: 437479,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'MYS'
            ],
            region: 'Asia',
            subregion: 'South-Eastern Asia'
        },
        BGR: {
            NAME: 'Bulgaria',
            Population: 6948445,
            Susceptible: 6948445,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'GRC',
                'MKD',
                'ROU',
                'SRB',
                'TUR'
            ],
            region: 'Europe',
            subregion: 'Eastern Europe'
        },
        BFA: {
            NAME: 'Burkina Faso',
            Population: 20903273,
            Susceptible: 20903273,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'BEN',
                'CIV',
                'GHA',
                'MLI',
                'NER',
                'TGO'
            ],
            region: 'Africa',
            subregion: 'Western Africa'
        },
        BDI: {
            NAME: 'Burundi',
            Population: 11890784,
            Susceptible: 11890784,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'COD',
                'RWA',
                'TZA'
            ],
            region: 'Africa',
            subregion: 'Eastern Africa'
        },
        KHM: {
            NAME: 'Cambodia',
            Population: 16718965,
            Susceptible: 16718965,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'LAO',
                'THA',
                'VNM'
            ],
            region: 'Asia',
            subregion: 'South-Eastern Asia'
        },
        CAN: {
            NAME: 'Canada',
            Population: 37742154,
            Susceptible: 37742154,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'USA'
            ],
            region: 'Americas',
            subregion: 'North America'
        },
        CPV: {
            NAME: 'Cape Verde',
            Population: 543767,
            Susceptible: 543767,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [],
            region: 'Africa',
            subregion: 'Western Africa'
        },
        CAF: {
            NAME: 'Central African Republic',
            Population: 4829767,
            Susceptible: 4829767,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'CMR',
                'TCD',
                'COD',
                'COG',
                'SSD',
                'SDN'
            ],
            region: 'Africa',
            subregion: 'Middle Africa'
        },
        TCD: {
            NAME: 'Chad',
            Population: 16425864,
            Susceptible: 16425864,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'CMR',
                'CAF',
                'LBY',
                'NER',
                'NGA',
                'SDN'
            ],
            region: 'Africa',
            subregion: 'Middle Africa'
        },
        CHL: {
            NAME: 'Chile',
            Population: 19116201,
            Susceptible: 19116201,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'ARG',
                'BOL',
                'PER'
            ],
            region: 'Americas',
            subregion: 'South America'
        },
        CHN: {
            NAME: 'China',
            Population: 1439323776,
            Susceptible: 1439323776,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'AFG',
                'BTN',
                'MMR',
                'IND',
                'KAZ',
                'NPL',
                'PRK',
                'KGZ',
                'LAO',
                'MNG',
                'PAK',
                'RUS',
                'TJK',
                'VNM'
            ],
            region: 'Asia',
            subregion: 'Eastern Asia'
        },
        COL: {
            NAME: 'Colombia',
            Population: 50882891,
            Susceptible: 50882891,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'BRA',
                'ECU',
                'PAN',
                'PER',
                'VEN'
            ],
            region: 'Americas',
            subregion: 'South America'
        },
        COM: {
            NAME: 'Comoros',
            Population: 869601,
            Susceptible: 869601,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [],
            region: 'Africa',
            subregion: 'Eastern Africa'
        },
        COG: {
            NAME: 'Congo',
            Population: 5518087,
            Susceptible: 5518087,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'AGO',
                'CMR',
                'CAF',
                'COD',
                'GAB'
            ],
            region: 'Africa',
            subregion: 'Middle Africa'
        },
        COD: {
            NAME: 'Democratic Republic of Congo',
            Population: 89561403,
            Susceptible: 89561403,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'AGO',
                'BDI',
                'CAF',
                'COG',
                'RWA',
                'SSD',
                'TZA',
                'UGA',
                'ZMB'
            ],
            region: 'Africa',
            subregion: 'Middle Africa'
        },
        CRI: {
            NAME: 'Costa Rica',
            Population: 5094118,
            Susceptible: 5094118,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'NIC',
                'PAN'
            ],
            region: 'Americas',
            subregion: 'Central America'
        },
        CIV: {
            NAME: 'Cote d\'Ivoire',
            Population: 26378274,
            Susceptible: 26378274,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'BFA',
                'GHA',
                'GIN',
                'LBR',
                'MLI'
            ],
            region: 'Africa',
            subregion: 'Western Africa'
        },
        HRV: {
            NAME: 'Croatia',
            Population: 4105267,
            Susceptible: 4105267,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'BIH',
                'HUN',
                'MNE',
                'SRB',
                'SVN'
            ],
            region: 'Europe',
            subregion: 'Southern Europe'
        },
        CUB: {
            NAME: 'Cuba',
            Population: 11326616,
            Susceptible: 11326616,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [],
            region: 'Americas',
            subregion: 'Caribbean'
        },
        CYP: {
            NAME: 'Cyprus',
            Population: 1207359,
            Susceptible: 1207359,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'CY2'
            ],
            region: 'Europe',
            subregion: 'Eastern Europe'
        },
        CZE: {
            NAME: 'Czech Republic',
            Population: 10708981,
            Susceptible: 10708981,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'AUT',
                'DEU',
                'POL',
                'SVK'
            ],
            region: 'Europe',
            subregion: 'Eastern Europe'
        },
        DNK: {
            NAME: 'Denmark',
            Population: 5792202,
            Susceptible: 5792202,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'DEU'
            ],
            region: 'Europe',
            subregion: 'Northern Europe'
        },
        DJI: {
            NAME: 'Djibouti',
            Population: 988000,
            Susceptible: 988000,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'ERI',
                'ETH',
                'SO2'
            ],
            region: 'Africa',
            subregion: 'Eastern Africa'
        },
        DMA: {
            NAME: 'Dominica',
            Population: 71986,
            Susceptible: 71986,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [],
            region: 'Americas',
            subregion: 'Caribbean'
        },
        DOM: {
            NAME: 'Dominican Republic',
            Population: 10847910,
            Susceptible: 10847910,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'HTI'
            ],
            region: 'Americas',
            subregion: 'Caribbean'
        },
        ECU: {
            NAME: 'Ecuador',
            Population: 17643054,
            Susceptible: 17643054,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'COL',
                'PER'
            ],
            region: 'Americas',
            subregion: 'South America'
        },
        EGY: {
            NAME: 'Egypt',
            Population: 102334404,
            Susceptible: 102334404,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'ISR',
                'LBY',
                'PSE',
                'SDN'
            ],
            region: 'Africa',
            subregion: 'Northern Africa'
        },
        SLV: {
            NAME: 'El Salvador',
            Population: 6486205,
            Susceptible: 6486205,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'GTM',
                'HND'
            ],
            region: 'Americas',
            subregion: 'Central America'
        },
        GNQ: {
            NAME: 'Equatorial Guinea',
            Population: 1402985,
            Susceptible: 1402985,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'CMR',
                'GAB'
            ],
            region: 'Africa',
            subregion: 'Middle Africa'
        },
        ERI: {
            NAME: 'Eritrea',
            Population: 3546421,
            Susceptible: 3546421,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'DJI',
                'ETH',
                'SDN'
            ],
            region: 'Africa',
            subregion: 'Eastern Africa'
        },
        EST: {
            NAME: 'Estonia',
            Population: 1326535,
            Susceptible: 1326535,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'LVA',
                'RUS'
            ],
            region: 'Europe',
            subregion: 'Northern Europe'
        },
        ETH: {
            NAME: 'Ethiopia',
            Population: 114963588,
            Susceptible: 114963588,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'DJI',
                'ERI',
                'KEN',
                'SOM',
                'SSD',
                'SDN',
                'SO2'
            ],
            region: 'Africa',
            subregion: 'Eastern Africa'
        },
        FJI: {
            NAME: 'Fiji',
            Population: 896445,
            Susceptible: 896445,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [],
            region: 'Oceania',
            subregion: 'Melanesia'
        },
        FIN: {
            NAME: 'Finland',
            Population: 5540720,
            Susceptible: 5540720,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'NOR',
                'SWE',
                'RUS'
            ],
            region: 'Europe',
            subregion: 'Northern Europe'
        },
        FRA: {
            NAME: 'France',
            Population: 65273511,
            Susceptible: 65273511,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'AND',
                'BEL',
                'DEU',
                'ITA',
                'LUX',
                'MCO',
                'ESP',
                'CHE'
            ],
            region: 'Europe',
            subregion: 'Western Europe'
        },
        GUF: {
            NAME: 'French Guiana',
            Population: 294071,
            Susceptible: 294071,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'BRA',
                'SUR'
            ],
            region: 'Americas',
            subregion: 'South America'
        },
        GAB: {
            NAME: 'Gabon',
            Population: 2225734,
            Susceptible: 2225734,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'CMR',
                'COG',
                'GNQ'
            ],
            region: 'Africa',
            subregion: 'Middle Africa'
        },
        GMB: {
            NAME: 'Gambia',
            Population: 2416668,
            Susceptible: 2416668,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'SEN'
            ],
            region: 'Africa',
            subregion: 'Western Africa'
        },
        GEO: {
            NAME: 'Georgia',
            Population: 3989167,
            Susceptible: 3989167,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'ARM',
                'AZE',
                'RUS',
                'TUR'
            ],
            region: 'Asia',
            subregion: 'Western Asia'
        },
        DEU: {
            NAME: 'Germany',
            Population: 83783942,
            Susceptible: 83783942,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'AUT',
                'BEL',
                'CZE',
                'DNK',
                'FRA',
                'LUX',
                'NLD',
                'POL',
                'CHE'
            ],
            region: 'Europe',
            subregion: 'Western Europe'
        },
        GHA: {
            NAME: 'Ghana',
            Population: 31072940,
            Susceptible: 31072940,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'BFA',
                'CIV',
                'TGO'
            ],
            region: 'Africa',
            subregion: 'Western Africa'
        },
        GRC: {
            NAME: 'Greece',
            Population: 10423054,
            Susceptible: 10423054,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'ALB',
                'BGR',
                'TUR',
                'MKD'
            ],
            region: 'Europe',
            subregion: 'Southern Europe'
        },
        GRD: {
            NAME: 'Grenada',
            Population: 112523,
            Susceptible: 112523,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [],
            region: 'Americas',
            subregion: 'Caribbean'
        },
        GTM: {
            NAME: 'Guatemala',
            Population: 17915568,
            Susceptible: 17915568,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'BLZ',
                'SLV',
                'HND',
                'MEX'
            ],
            region: 'Americas',
            subregion: 'Central America'
        },
        GIN: {
            NAME: 'Guinea',
            Population: 13132795,
            Susceptible: 13132795,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'CIV',
                'GNB',
                'LBR',
                'MLI',
                'SEN',
                'SLE'
            ],
            region: 'Africa',
            subregion: 'Western Africa'
        },
        GNB: {
            NAME: 'Guinea-Bissau',
            Population: 1968001,
            Susceptible: 1968001,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'GIN',
                'SEN'
            ],
            region: 'Africa',
            subregion: 'Western Africa'
        },
        GUY: {
            NAME: 'Guyana',
            Population: 786552,
            Susceptible: 786552,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'BRA',
                'SUR',
                'VEN'
            ],
            region: 'Americas',
            subregion: 'South America'
        },
        HTI: {
            NAME: 'Haiti',
            Population: 11402528,
            Susceptible: 11402528,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'DOM'
            ],
            region: 'Americas',
            subregion: 'Caribbean'
        },
        HND: {
            NAME: 'Honduras',
            Population: 9904607,
            Susceptible: 9904607,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'GTM',
                'SLV',
                'NIC'
            ],
            region: 'Americas',
            subregion: 'Central America'
        },
        HUN: {
            NAME: 'Hungary',
            Population: 9660351,
            Susceptible: 9660351,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'AUT',
                'HRV',
                'ROU',
                'SRB',
                'SVK',
                'SVN',
                'UKR'
            ],
            region: 'Europe',
            subregion: 'Eastern Europe'
        },
        ISL: {
            NAME: 'Iceland',
            Population: 341243,
            Susceptible: 341243,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [],
            region: 'Europe',
            subregion: 'Northern Europe'
        },
        IND: {
            NAME: 'India',
            Population: 1380004385,
            Susceptible: 1380004385,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'BGD',
                'BTN',
                'MMR',
                'CHN',
                'NPL',
                'PAK'
            ],
            region: 'Asia',
            subregion: 'Southern Asia'
        },
        IDN: {
            NAME: 'Indonesia',
            Population: 273523615,
            Susceptible: 273523615,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'TLS',
                'MYS',
                'PNG'
            ],
            region: 'Asia',
            subregion: 'South-Eastern Asia'
        },
        IRN: {
            NAME: 'Iran',
            Population: 83992949,
            Susceptible: 83992949,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'AFG',
                'ARM',
                'AZE',
                'IRQ',
                'PAK',
                'TUR',
                'TKM'
            ],
            region: 'Asia',
            subregion: 'Southern Asia'
        },
        IRQ: {
            NAME: 'Iraq',
            Population: 40222493,
            Susceptible: 40222493,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'IRN',
                'JOR',
                'KWT',
                'SAU',
                'SYR',
                'TUR'
            ],
            region: 'Asia',
            subregion: 'Western Asia'
        },
        IRL: {
            NAME: 'Ireland',
            Population: 4937786,
            Susceptible: 4937786,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'GBR'
            ],
            region: 'Europe',
            subregion: 'Northern Europe'
        },
        ISR: {
            NAME: 'Israel',
            Population: 8655535,
            Susceptible: 8655535,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'EGY',
                'JOR',
                'LBN',
                'PSE',
                'SYR'
            ],
            region: 'Asia',
            subregion: 'Western Asia'
        },
        ITA: {
            NAME: 'Italy',
            Population: 60461826,
            Susceptible: 60461826,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'AUT',
                'FRA',
                'SMR',
                'SVN',
                'CHE'
            ],
            region: 'Europe',
            subregion: 'Southern Europe'
        },
        JAM: {
            NAME: 'Jamaica',
            Population: 2961167,
            Susceptible: 2961167,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [],
            region: 'Americas',
            subregion: 'Caribbean'
        },
        JPN: {
            NAME: 'Japan',
            Population: 126476461,
            Susceptible: 126476461,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [],
            region: 'Asia',
            subregion: 'Eastern Asia'
        },
        JOR: {
            NAME: 'Jordan',
            Population: 10203134,
            Susceptible: 10203134,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'IRQ',
                'ISR',
                'PSE',
                'SAU',
                'SYR'
            ],
            region: 'Asia',
            subregion: 'Western Asia'
        },
        KAZ: {
            NAME: 'Kazakhstan',
            Population: 18776707,
            Susceptible: 18776707,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'CHN',
                'KGZ',
                'RUS',
                'TKM',
                'UZB'
            ],
            region: 'Asia',
            subregion: 'Central Asia'
        },
        KEN: {
            NAME: 'Kenya',
            Population: 53771296,
            Susceptible: 53771296,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'ETH',
                'SOM',
                'SSD',
                'TZA',
                'UGA'
            ],
            region: 'Africa',
            subregion: 'Eastern Africa'
        },
        KIR: {
            NAME: 'Kiribati',
            Population: 119449,
            Susceptible: 119449,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [],
            region: 'Oceania',
            subregion: 'Micronesia'
        },
        PRK: {
            NAME: 'North Korea',
            Population: 25778816,
            Susceptible: 25778816,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'CHN',
                'KOR',
                'RUS'
            ],
            region: 'Asia',
            subregion: 'Eastern Asia'
        },
        KOR: {
            NAME: 'South Korea',
            Population: 51269185,
            Susceptible: 51269185,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'PRK'
            ],
            region: 'Asia',
            subregion: 'Eastern Asia'
        },
        KWT: {
            NAME: 'Kuwait',
            Population: 4270571,
            Susceptible: 4270571,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'IRQ',
                'SAU'
            ],
            region: 'Asia',
            subregion: 'Western Asia'
        },
        KGZ: {
            NAME: 'Kyrgyzstan',
            Population: 6524195,
            Susceptible: 6524195,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'CHN',
                'KAZ',
                'TJK',
                'UZB'
            ],
            region: 'Asia',
            subregion: 'Central Asia'
        },
        LAO: {
            NAME: 'Laos',
            Population: 7275560,
            Susceptible: 7275560,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'MMR',
                'KHM',
                'CHN',
                'THA',
                'VNM'
            ],
            region: 'Asia',
            subregion: 'South-Eastern Asia'
        },
        LVA: {
            NAME: 'Latvia',
            Population: 1886198,
            Susceptible: 1886198,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'BLR',
                'EST',
                'LTU',
                'RUS'
            ],
            region: 'Europe',
            subregion: 'Northern Europe'
        },
        LBN: {
            NAME: 'Lebanon',
            Population: 6825445,
            Susceptible: 6825445,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'ISR',
                'SYR'
            ],
            region: 'Asia',
            subregion: 'Western Asia'
        },
        LSO: {
            NAME: 'Lesotho',
            Population: 2142249,
            Susceptible: 2142249,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'ZAF'
            ],
            region: 'Africa',
            subregion: 'Southern Africa'
        },
        LBR: {
            NAME: 'Liberia',
            Population: 5057681,
            Susceptible: 5057681,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'GIN',
                'CIV',
                'SLE'
            ],
            region: 'Africa',
            subregion: 'Western Africa'
        },
        LBY: {
            NAME: 'Libyan Arab Jamahiriya',
            Population: 6871292,
            Susceptible: 6871292,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'DZA',
                'TCD',
                'EGY',
                'NER',
                'SDN',
                'TUN'
            ],
            region: 'Africa',
            subregion: 'Northern Africa'
        },
        LIE: {
            NAME: 'Liechtenstein',
            Population: 38128,
            Susceptible: 38128,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'AUT',
                'CHE'
            ],
            region: 'Europe',
            subregion: 'Western Europe'
        },
        LTU: {
            NAME: 'Lithuania',
            Population: 2722289,
            Susceptible: 2722289,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'BLR',
                'LVA',
                'POL',
                'RUS'
            ],
            region: 'Europe',
            subregion: 'Northern Europe'
        },
        LUX: {
            NAME: 'Luxembourg',
            Population: 625978,
            Susceptible: 625978,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'BEL',
                'FRA',
                'DEU'
            ],
            region: 'Europe',
            subregion: 'Western Europe'
        },
        MKD: {
            NAME: 'Macedonia',
            Population: 2083374,
            Susceptible: 2083374,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'ALB',
                'BGR',
                'GRC',
                'UNK',
                'SRB'
            ],
            region: 'Europe',
            subregion: 'Southern Europe'
        },
        MDG: {
            NAME: 'Madagascar',
            Population: 27691018,
            Susceptible: 27691018,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [],
            region: 'Africa',
            subregion: 'Eastern Africa'
        },
        MWI: {
            NAME: 'Malawi',
            Population: 19129952,
            Susceptible: 19129952,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'MOZ',
                'TZA',
                'ZMB'
            ],
            region: 'Africa',
            subregion: 'Eastern Africa'
        },
        MYS: {
            NAME: 'Malaysia',
            Population: 32365999,
            Susceptible: 32365999,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'BRN',
                'IDN',
                'THA'
            ],
            region: 'Asia',
            subregion: 'South-Eastern Asia'
        },
        MDV: {
            NAME: 'Maldives',
            Population: 540544,
            Susceptible: 540544,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [],
            region: 'Asia',
            subregion: 'Southern Asia'
        },
        MLI: {
            NAME: 'Mali',
            Population: 20250833,
            Susceptible: 20250833,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'DZA',
                'BFA',
                'GIN',
                'CIV',
                'MRT',
                'NER',
                'SEN'
            ],
            region: 'Africa',
            subregion: 'Western Africa'
        },
        MLT: {
            NAME: 'Malta',
            Population: 441543,
            Susceptible: 441543,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [],
            region: 'Europe',
            subregion: 'Southern Europe'
        },
        MHL: {
            NAME: 'Marshall Islands',
            Population: 59190,
            Susceptible: 59190,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [],
            region: 'Oceania',
            subregion: 'Micronesia'
        },
        MRT: {
            NAME: 'Mauritania',
            Population: 4649658,
            Susceptible: 4649658,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'DZA',
                'MLI',
                'SEN',
                'ESH'
            ],
            region: 'Africa',
            subregion: 'Western Africa'
        },
        MUS: {
            NAME: 'Mauritius',
            Population: 1271768,
            Susceptible: 1271768,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [],
            region: 'Africa',
            subregion: 'Eastern Africa'
        },
        MEX: {
            NAME: 'Mexico',
            Population: 128932753,
            Susceptible: 128932753,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'BLZ',
                'GTM',
                'USA'
            ],
            region: 'Americas',
            subregion: 'North America'
        },
        FSM: {
            NAME: 'Federated States of Micronesia',
            Population: 548914,
            Susceptible: 548914,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [],
            region: 'Oceania',
            subregion: 'Micronesia'
        },
        MDA: {
            NAME: 'Moldova',
            Population: 4033963,
            Susceptible: 4033963,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'ROU',
                'UKR'
            ],
            region: 'Europe',
            subregion: 'Eastern Europe'
        },
        MCO: {
            NAME: 'Monaco',
            Population: 39242,
            Susceptible: 39242,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'FRA'
            ],
            region: 'Europe',
            subregion: 'Western Europe'
        },
        MNG: {
            NAME: 'Mongolia',
            Population: 3278290,
            Susceptible: 3278290,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'CHN',
                'RUS'
            ],
            region: 'Asia',
            subregion: 'Eastern Asia'
        },
        MNE: {
            NAME: 'Montenegro',
            Population: 628066,
            Susceptible: 628066,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'ALB',
                'BIH',
                'HRV',
                'UNK',
                'SRB'
            ],
            region: 'Europe',
            subregion: 'Southern Europe'
        },
        MAR: {
            NAME: 'Morocco',
            Population: 36910560,
            Susceptible: 36910560,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'DZA',
                'ESH',
                'ESP'
            ],
            region: 'Africa',
            subregion: 'Northern Africa'
        },
        MOZ: {
            NAME: 'Mozambique',
            Population: 31255435,
            Susceptible: 31255435,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'MWI',
                'ZAF',
                'SWZ',
                'TZA',
                'ZMB',
                'ZWE'
            ],
            region: 'Africa',
            subregion: 'Eastern Africa'
        },
        MMR: {
            NAME: 'Myanmar',
            Population: 54409800,
            Susceptible: 54409800,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'BGD',
                'CHN',
                'IND',
                'LAO',
                'THA'
            ],
            region: 'Asia',
            subregion: 'South-Eastern Asia'
        },
        NAM: {
            NAME: 'Namibia',
            Population: 2540905,
            Susceptible: 2540905,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'AGO',
                'BWA',
                'ZAF',
                'ZMB'
            ],
            region: 'Africa',
            subregion: 'Southern Africa'
        },
        NRU: {
            NAME: 'Nauru',
            Population: 10824,
            Susceptible: 10824,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [],
            region: 'Oceania',
            subregion: 'Micronesia'
        },
        NPL: {
            NAME: 'Nepal',
            Population: 29136808,
            Susceptible: 29136808,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'CHN',
                'IND'
            ],
            region: 'Asia',
            subregion: 'Southern Asia'
        },
        NLD: {
            NAME: 'Netherlands',
            Population: 17134872,
            Susceptible: 17134872,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'BEL',
                'DEU'
            ],
            region: 'Europe',
            subregion: 'Western Europe'
        },
        NZL: {
            NAME: 'New Zealand',
            Population: 4822233,
            Susceptible: 4822233,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [],
            region: 'Oceania',
            subregion: 'Australia and New Zealand'
        },
        NIC: {
            NAME: 'Nicaragua',
            Population: 6624554,
            Susceptible: 6624554,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'CRI',
                'HND'
            ],
            region: 'Americas',
            subregion: 'Central America'
        },
        NER: {
            NAME: 'Niger',
            Population: 24206644,
            Susceptible: 24206644,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'DZA',
                'BEN',
                'BFA',
                'TCD',
                'LBY',
                'MLI',
                'NGA'
            ],
            region: 'Africa',
            subregion: 'Western Africa'
        },
        NGA: {
            NAME: 'Nigeria',
            Population: 206139589,
            Susceptible: 206139589,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'BEN',
                'CMR',
                'TCD',
                'NER'
            ],
            region: 'Africa',
            subregion: 'Western Africa'
        },
        NOR: {
            NAME: 'Norway',
            Population: 5421241,
            Susceptible: 5421241,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'FIN',
                'SWE',
                'RUS'
            ],
            region: 'Europe',
            subregion: 'Northern Europe'
        },
        OMN: {
            NAME: 'Oman',
            Population: 5106626,
            Susceptible: 5106626,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'SAU',
                'ARE',
                'YEM'
            ],
            region: 'Asia',
            subregion: 'Western Asia'
        },
        PAK: {
            NAME: 'Pakistan',
            Population: 220892340,
            Susceptible: 220892340,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'AFG',
                'CHN',
                'IND',
                'IRN'
            ],
            region: 'Asia',
            subregion: 'Southern Asia'
        },
        PLW: {
            NAME: 'Palau',
            Population: 18094,
            Susceptible: 18094,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [],
            region: 'Oceania',
            subregion: 'Micronesia'
        },
        PAN: {
            NAME: 'Panama',
            Population: 4314767,
            Susceptible: 4314767,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'COL',
                'CRI'
            ],
            region: 'Americas',
            subregion: 'Central America'
        },
        PNG: {
            NAME: 'Papua New Guinea',
            Population: 8947024,
            Susceptible: 8947024,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'IDN'
            ],
            region: 'Oceania',
            subregion: 'Melanesia'
        },
        PRY: {
            NAME: 'Paraguay',
            Population: 7132538,
            Susceptible: 7132538,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'ARG',
                'BOL',
                'BRA'
            ],
            region: 'Americas',
            subregion: 'South America'
        },
        PER: {
            NAME: 'Peru',
            Population: 32971854,
            Susceptible: 32971854,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'BOL',
                'BRA',
                'CHL',
                'COL',
                'ECU'
            ],
            region: 'Americas',
            subregion: 'South America'
        },
        PHL: {
            NAME: 'Philippines',
            Population: 109581078,
            Susceptible: 109581078,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [],
            region: 'Asia',
            subregion: 'South-Eastern Asia'
        },
        POL: {
            NAME: 'Poland',
            Population: 37846611,
            Susceptible: 37846611,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'BLR',
                'CZE',
                'DEU',
                'LTU',
                'RUS',
                'SVK',
                'UKR'
            ],
            region: 'Europe',
            subregion: 'Eastern Europe'
        },
        PRT: {
            NAME: 'Portugal',
            Population: 10196709,
            Susceptible: 10196709,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'ESP'
            ],
            region: 'Europe',
            subregion: 'Southern Europe'
        },
        QAT: {
            NAME: 'Qatar',
            Population: 2881053,
            Susceptible: 2881053,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'SAU'
            ],
            region: 'Asia',
            subregion: 'Western Asia'
        },
        ROU: {
            NAME: 'Romania',
            Population: 19237691,
            Susceptible: 19237691,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'BGR',
                'HUN',
                'MDA',
                'SRB',
                'UKR'
            ],
            region: 'Europe',
            subregion: 'Eastern Europe'
        },
        RUS: {
            NAME: 'Russian Federation',
            Population: 145934462,
            Susceptible: 145934462,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'AZE',
                'BLR',
                'CHN',
                'EST',
                'FIN',
                'GEO',
                'KAZ',
                'PRK',
                'LVA',
                'LTU',
                'MNG',
                'NOR',
                'POL',
                'UKR'
            ],
            region: 'Europe',
            subregion: 'Eastern Europe'
        },
        RWA: {
            NAME: 'Rwanda',
            Population: 12952218,
            Susceptible: 12952218,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'BDI',
                'COD',
                'TZA',
                'UGA'
            ],
            region: 'Africa',
            subregion: 'Eastern Africa'
        },
        KNA: {
            NAME: 'Saint Kitts and Nevis',
            Population: 53199,
            Susceptible: 53199,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [],
            region: 'Americas',
            subregion: 'Caribbean'
        },
        LCA: {
            NAME: 'Saint Lucia',
            Population: 183627,
            Susceptible: 183627,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [],
            region: 'Americas',
            subregion: 'Caribbean'
        },
        VCT: {
            NAME: 'Saint Vincent and the Grenadines',
            Population: 110210,
            Susceptible: 110210,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [],
            region: 'Americas',
            subregion: 'Caribbean'
        },
        WSM: {
            NAME: 'Samoa',
            Population: 196130,
            Susceptible: 196130,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [],
            region: 'Oceania',
            subregion: 'Polynesia'
        },
        SMR: {
            NAME: 'San Marino',
            Population: 33931,
            Susceptible: 33931,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'ITA'
            ],
            region: 'Europe',
            subregion: 'Southern Europe'
        },
        STP: {
            NAME: 'Sao Tome and Principe',
            Population: 219159,
            Susceptible: 219159,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [],
            region: 'Africa',
            subregion: 'Middle Africa'
        },
        SAU: {
            NAME: 'Saudi Arabia',
            Population: 34813871,
            Susceptible: 34813871,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'IRQ',
                'JOR',
                'KWT',
                'OMN',
                'QAT',
                'ARE',
                'YEM'
            ],
            region: 'Asia',
            subregion: 'Western Asia'
        },
        SEN: {
            NAME: 'Senegal',
            Population: 16743927,
            Susceptible: 16743927,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'GMB',
                'GIN',
                'GNB',
                'MLI',
                'MRT'
            ],
            region: 'Africa',
            subregion: 'Western Africa'
        },
        SRB: {
            NAME: 'Serbia',
            Population: 8737371,
            Susceptible: 8737371,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'BIH',
                'BGR',
                'HRV',
                'HUN',
                'UNK',
                'MKD',
                'MNE',
                'ROU'
            ],
            region: 'Europe',
            subregion: 'Southern Europe'
        },
        SYC: {
            NAME: 'Seychelles',
            Population: 98347,
            Susceptible: 98347,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [],
            region: 'Africa',
            subregion: 'Eastern Africa'
        },
        SLE: {
            NAME: 'Sierra Leone',
            Population: 7976983,
            Susceptible: 7976983,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'GIN',
                'LBR'
            ],
            region: 'Africa',
            subregion: 'Western Africa'
        },
        SGP: {
            NAME: 'Singapore',
            Population: 5850342,
            Susceptible: 5850342,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [],
            region: 'Asia',
            subregion: 'South-Eastern Asia'
        },
        SVK: {
            NAME: 'Slovakia',
            Population: 5459642,
            Susceptible: 5459642,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'AUT',
                'CZE',
                'HUN',
                'POL',
                'UKR'
            ],
            region: 'Europe',
            subregion: 'Eastern Europe'
        },
        SVN: {
            NAME: 'Slovenia',
            Population: 2078938,
            Susceptible: 2078938,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'AUT',
                'HRV',
                'ITA',
                'HUN'
            ],
            region: 'Europe',
            subregion: 'Southern Europe'
        },
        SLB: {
            NAME: 'Solomon Islands',
            Population: 686884,
            Susceptible: 686884,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [],
            region: 'Oceania',
            subregion: 'Melanesia'
        },
        SOM: {
            NAME: 'Somalia',
            Population: 12593222,
            Susceptible: 12593222,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'DJI',
                'ETH',
                'KEN'
            ],
            region: 'Africa',
            subregion: 'Eastern Africa'
        },
        ZAF: {
            NAME: 'South Africa',
            Population: 59308690,
            Susceptible: 59308690,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'BWA',
                'LSO',
                'MOZ',
                'NAM',
                'SWZ',
                'ZWE'
            ],
            region: 'Africa',
            subregion: 'Southern Africa'
        },
        ESP: {
            NAME: 'Spain',
            Population: 46754778,
            Susceptible: 46754778,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'AND',
                'FRA',
                'PRT',
                'MAR'
            ],
            region: 'Europe',
            subregion: 'Southern Europe'
        },
        LKA: {
            NAME: 'Sri Lanka',
            Population: 21413249,
            Susceptible: 21413249,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'IND'
            ],
            region: 'Asia',
            subregion: 'Southern Asia'
        },
        SDN: {
            NAME: 'Sudan',
            Population: 43849260,
            Susceptible: 43849260,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'CAF',
                'TCD',
                'EGY',
                'ERI',
                'ETH',
                'LBY',
                'SSD'
            ],
            region: 'Africa',
            subregion: 'Northern Africa'
        },
        SUR: {
            NAME: 'Suriname',
            Population: 586632,
            Susceptible: 586632,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'BRA',
                'GUY',
                'GUF'
            ],
            region: 'Americas',
            subregion: 'South America'
        },
        SWZ: {
            NAME: 'Swaziland',
            Population: 1167123,
            Susceptible: 1167123,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'MOZ',
                'ZAF'
            ],
            region: 'Africa',
            subregion: 'Southern Africa'
        },
        SWE: {
            NAME: 'Sweden',
            Population: 10099265,
            Susceptible: 10099265,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'FIN',
                'NOR'
            ],
            region: 'Europe',
            subregion: 'Northern Europe'
        },
        CHE: {
            NAME: 'Switzerland',
            Population: 8654622,
            Susceptible: 8654622,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'AUT',
                'FRA',
                'ITA',
                'LIE',
                'DEU'
            ],
            region: 'Europe',
            subregion: 'Western Europe'
        },
        SYR: {
            NAME: 'Syrian Arab Republic',
            Population: 17500658,
            Susceptible: 17500658,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'IRQ',
                'ISR',
                'JOR',
                'LBN',
                'TUR'
            ],
            region: 'Asia',
            subregion: 'Western Asia'
        },
        TJK: {
            NAME: 'Tajikistan',
            Population: 9537645,
            Susceptible: 9537645,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'AFG',
                'CHN',
                'KGZ',
                'UZB'
            ],
            region: 'Asia',
            subregion: 'Central Asia'
        },
        TZA: {
            NAME: 'Tanzania',
            Population: 59734218,
            Susceptible: 59734218,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'BDI',
                'COD',
                'KEN',
                'MWI',
                'MOZ',
                'RWA',
                'UGA',
                'ZMB'
            ],
            region: 'Africa',
            subregion: 'Eastern Africa'
        },
        THA: {
            NAME: 'Thailand',
            Population: 69799978,
            Susceptible: 69799978,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'MMR',
                'KHM',
                'LAO',
                'MYS'
            ],
            region: 'Asia',
            subregion: 'South-Eastern Asia'
        },
        TLS: {
            NAME: 'Timor-Leste',
            Population: 1318445,
            Susceptible: 1318445,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'IDN'
            ],
            region: 'Asia',
            subregion: 'South-Eastern Asia'
        },
        TGO: {
            NAME: 'Togo',
            Population: 8278724,
            Susceptible: 8278724,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'BEN',
                'BFA',
                'GHA'
            ],
            region: 'Africa',
            subregion: 'Western Africa'
        },
        TON: {
            NAME: 'Tonga',
            Population: 105695,
            Susceptible: 105695,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [],
            region: 'Oceania',
            subregion: 'Polynesia'
        },
        TTO: {
            NAME: 'Trinidad and Tobago',
            Population: 1399488,
            Susceptible: 1399488,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [],
            region: 'Americas',
            subregion: 'Caribbean'
        },
        TUN: {
            NAME: 'Tunisia',
            Population: 11818619,
            Susceptible: 11818619,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'DZA',
                'LBY'
            ],
            region: 'Africa',
            subregion: 'Northern Africa'
        },
        TUR: {
            NAME: 'Turkey',
            Population: 84339067,
            Susceptible: 84339067,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'ARM',
                'AZE',
                'BGR',
                'GEO',
                'GRC',
                'IRN',
                'IRQ',
                'SYR'
            ],
            region: 'Asia',
            subregion: 'Western Asia'
        },
        TKM: {
            NAME: 'Turkmenistan',
            Population: 6031200,
            Susceptible: 6031200,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'AFG',
                'IRN',
                'KAZ',
                'UZB'
            ],
            region: 'Asia',
            subregion: 'Central Asia'
        },
        TUV: {
            NAME: 'Tuvalu',
            Population: 11792,
            Susceptible: 11792,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [],
            region: 'Oceania',
            subregion: 'Polynesia'
        },
        UGA: {
            NAME: 'Uganda',
            Population: 45741007,
            Susceptible: 45741007,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'COD',
                'KEN',
                'RWA',
                'SSD',
                'TZA'
            ],
            region: 'Africa',
            subregion: 'Eastern Africa'
        },
        UKR: {
            NAME: 'Ukraine',
            Population: 43733762,
            Susceptible: 43733762,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'BLR',
                'HUN',
                'MDA',
                'POL',
                'ROU',
                'RUS',
                'SVK'
            ],
            region: 'Europe',
            subregion: 'Eastern Europe'
        },
        ARE: {
            NAME: 'United Arab Emirates',
            Population: 9890402,
            Susceptible: 9890402,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'OMN',
                'SAU'
            ],
            region: 'Asia',
            subregion: 'Western Asia'
        },
        GBR: {
            NAME: 'United Kingdom',
            Population: 67886011,
            Susceptible: 67886011,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'IRL'
            ],
            region: 'Europe',
            subregion: 'Northern Europe'
        },
        USA: {
            NAME: 'United States',
            Population: 331002651,
            Susceptible: 331002651,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'CAN',
                'MEX'
            ],
            region: 'Americas',
            subregion: 'North America'
        },
        URY: {
            NAME: 'Uruguay',
            Population: 3473730,
            Susceptible: 3473730,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'ARG',
                'BRA'
            ],
            region: 'Americas',
            subregion: 'South America'
        },
        UZB: {
            NAME: 'Uzbekistan',
            Population: 33469203,
            Susceptible: 33469203,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'AFG',
                'KAZ',
                'KGZ',
                'TJK',
                'TKM'
            ],
            region: 'Asia',
            subregion: 'Central Asia'
        },
        VUT: {
            NAME: 'Vanuatu',
            Population: 307145,
            Susceptible: 307145,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [],
            region: 'Oceania',
            subregion: 'Melanesia'
        },
        VEN: {
            NAME: 'Venezuela',
            Population: 28435940,
            Susceptible: 28435940,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'BRA',
                'COL',
                'GUY'
            ],
            region: 'Americas',
            subregion: 'South America'
        },
        VNM: {
            NAME: 'Viet Nam',
            Population: 97338579,
            Susceptible: 97338579,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'KHM',
                'CHN',
                'LAO'
            ],
            region: 'Asia',
            subregion: 'South-Eastern Asia'
        },
        YEM: {
            NAME: 'Yemen',
            Population: 29825964,
            Susceptible: 29825964,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'OMN',
                'SAU'
            ],
            region: 'Asia',
            subregion: 'Western Asia'
        },
        ZMB: {
            NAME: 'Zambia',
            Population: 18383955,
            Susceptible: 18383955,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'AGO',
                'BWA',
                'COD',
                'MWI',
                'MOZ',
                'NAM',
                'TZA',
                'ZWE'
            ],
            region: 'Africa',
            subregion: 'Eastern Africa'
        },
        ZWE: {
            NAME: 'Zimbabwe',
            Population: 14862924,
            Susceptible: 14862924,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'BWA',
                'MOZ',
                'ZAF',
                'ZMB'
            ],
            region: 'Africa',
            subregion: 'Eastern Africa'
        },
        ATF: {
            NAME: 'French Southern and Antarctic Lands',
            Population: 366,
            Susceptible: 366,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [],
            region: 'Africa',
            subregion: 'Southern Africa'
        },
        GRL: {
            NAME: 'Greenland',
            Population: 56025,
            Susceptible: 56025,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [],
            region: 'Americas',
            subregion: 'North America'
        },
        PRI: {
            NAME: 'Puerto Rico',
            Population: 2860853,
            Susceptible: 2860853,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [],
            region: 'Americas',
            subregion: 'Caribbean'
        },
        FLK: {
            NAME: 'Falkland Islands',
            Population: 2840,
            Susceptible: 2840,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [],
            region: 'Americas',
            subregion: 'South America'
        },
        ESH: {
            NAME: 'Western Sahara',
            Population: 597339,
            Susceptible: 597339,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'DZA',
                'MRT',
                'MAR'
            ],
            region: 'Africa',
            subregion: 'Northern Africa'
        },
        CMR: {
            NAME: 'Cameroon',
            Population: 26545863,
            Susceptible: 26545863,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'CAF',
                'TCD',
                'COG',
                'GNQ',
                'GAB',
                'NGA'
            ],
            region: 'Africa',
            subregion: 'Middle Africa'
        },
        SSD: {
            NAME: 'South Sudan',
            Population: 11193725,
            Susceptible: 11193725,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'CAF',
                'COD',
                'ETH',
                'KEN',
                'SDN',
                'UGA'
            ],
            region: 'Africa',
            subregion: 'Middle Africa'
        },
        NCL: {
            NAME: 'New Caledonia',
            Population: 284060,
            Susceptible: 284060,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [],
            region: 'Oceania',
            subregion: 'Melanesia'
        },
        TWN: {
            NAME: 'Taiwan',
            Population: 23816775,
            Susceptible: 23816775,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [],
            region: 'Asia',
            subregion: 'Eastern Asia'
        },
        PSE: {
            NAME: 'Palestine',
            Population: 5101414,
            Susceptible: 5101414,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'ISR',
                'EGY',
                'JOR'
            ],
            region: 'Asia',
            subregion: 'Western Asia'
        },
        UNK: {
            NAME: 'Kosovo',
            Population: 1895250,
            Susceptible: 1895250,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'ALB',
                'MKD',
                'MNE',
                'SRB'
            ],
            region: 'Europe',
            subregion: 'Eastern Europe'
        },
        SO2: {
            NAME: 'Somaliland',
            Population: 3500000,
            Susceptible: 3500000,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'SOM',
                'ETH'
            ],
            region: 'Africa',
            subregion: 'Eastern Africa'
        },
        CY2: {
            NAME: 'Northern Cyprus',
            Population: 265100,
            Susceptible: 265100,
            Infectious: 0,
            Recovered: 0,
            Deceased: 0,
            infectivity: 0,
            infectiousLooping: [],
            border: [
                'CYP'
            ],
            region: 'Europe',
            subregion: 'Eastern Europe'
        }
    },
});

export const susceptiblesSelector = selector({
    key: 'susceptiblesSelector',
    get: ({get}) => {
        const bigState = get(mapContainerState);
        let sus = 0;
        Object.keys(bigState).forEach(currentCountry => {
            sus += bigState[currentCountry].Susceptible;
        });
        return sus;
    },
});

export const infectiousSelector = selector({
    key: 'infectiousSelector',
    get: ({get}) => {
        const bigState = get(mapContainerState);
        let inf = 0;
        Object.keys(bigState).forEach(currentCountry => {
            inf += bigState[currentCountry].Infectious;
        });
        return inf;
    },
});

export const recoveredSelector = selector({
    key: 'recoveredSelector',
    get: ({get}) => {
        const bigState = get(mapContainerState);
        let rec = 0;
        Object.keys(bigState).forEach(currentCountry => {
            rec += bigState[currentCountry].Recovered;
        });
        return rec;
    },
});

export const deceasedSelector = selector({
    key: 'deceasedSelector',
    get: ({get}) => {
        const bigState = get(mapContainerState);
        let dec = 0;
        Object.keys(bigState).forEach(currentCountry => {
            dec += bigState[currentCountry].Deceased;
        });
        return dec;
    },
});

export const separateCountryByInfectivitySelector = selector({
    key: 'separateCountryByInfectivitySelector',
    get: ({get}) => {
        const bigState = get(mapContainerState);
        let countryName;
        let countryInfectivity;
        let countryPopulation;
        let countrySusceptibles;
        let countryInfectious;
        let countryRecovered;
        let countryDeceased;
        let countryList = [];
        Object.keys(bigState).forEach(currentCountry => {


            countryName = bigState[currentCountry].NAME;
            countryInfectivity = bigState[currentCountry].infectivity;
            countryPopulation = bigState[currentCountry].Population;
            countrySusceptibles = bigState[currentCountry].Susceptible;
            countryInfectious = bigState[currentCountry].Infectious;
            countryRecovered = bigState[currentCountry].Recovered;
            countryDeceased = bigState[currentCountry].Deceased;
            countryList.push({
                name: countryName,
                infectivity: countryInfectivity,
                population: countryPopulation,
                susceptibles: countrySusceptibles,
                infectious: countryInfectious,
                recovered: countryRecovered,
                deceased: countryDeceased
            })
        });
        return countryList;
    },
});

export const infectiousCountriesCountSelector = selector({
    key: 'infectiousCountriesCountSelector',
    get: ({get}) => {
        const bigState = get(mapContainerState);
        let infectedCountries = 0;
        let nonInfectedCountries = 0;
        Object.keys(bigState).forEach(currentCountry => {
            if (bigState[currentCountry].infectivity === 1) {
                infectedCountries++;
            } else if (bigState[currentCountry].infectivity === 0) {
                nonInfectedCountries++;
            }
        });
        return [infectedCountries, nonInfectedCountries];
    },
});

//vracia pocet infekcnych krajin (pre prepocet dovery)
export const infectiousCountriesNumberSelector = selector({
    key: 'infectiousCountriesNumberSelector',
    get: ({get}) => {
        const bigState = get(mapContainerState);
        let infCountries = 0;
        Object.keys(bigState).forEach(currentCountry => {
            if (bigState[currentCountry].infectivity === 1) {
                infCountries++;
            }
        });
        return infCountries;
    },
});

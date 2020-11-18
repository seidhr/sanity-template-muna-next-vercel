export default function getQuery (uri) {
  let query = `
    PREFIX dct: <http://purl.org/dc/terms/>
    PREFIX ubbont: <http://data.ub.uib.no/ontology/>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX dc: <http://purl.org/dc/elements/1.1/>
    PREFIX foaf: <http://xmlns.com/foaf/0.1/>
    PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
    PREFIX wgs: <http://www.w3.org/2003/01/geo/wgs84_pos#>
    PREFIX bibo: <http://purl.org/ontology/bibo/>
    
    CONSTRUCT {
    ?uri a ?type ;
        dct:title ?title ; 
        dct:identifier ?id ;
        ubbont:image ?image ;
        dct:subject ?subject ;
        dct:spatial ?spatial ;
        foaf:depicts ?depicts ;
        dct:description ?description ;
        dct:created ?created ;
        foaf:maker ?maker ;
        ubbont:homepage ?homepage .
      ?subject ?subjectP ?subjectO .
      ?spatial ?spatialP ?spatialO .
      ?depicts ?depictsP ?depictsO .
      ?maker ?makerP ?makerO .
    } WHERE { 
      GRAPH ?g {
        VALUES ?uri {<${uri}>}
          ?uri a ?type ;
            dct:title ?title ; 
            dct:identifier ?id .
        OPTIONAL { 
          ?uri ubbont:hasRepresentation / dct:hasPart ?page .
          ?page ubbont:sequenceNr 1 .
          ?page ubbont:hasResource ?resource .
          OPTIONAL {?resource ubbont:hasSMView ?smImage.}  
          OPTIONAL {?resource ubbont:hasMDView ?mdImage.}
        }
        OPTIONAL { 
          ?uri ubbont:hasRepresentation / dct:hasPart ?part .
          OPTIONAL {?part ubbont:hasMDView ?imgMD .}
          OPTIONAL {?part ubbont:hasSMView ?imgSM .} 
        }
        OPTIONAL { 
          ?uri dct:subject ?subject . 
          ?subject ?subjectP ?subjectO . 
          FILTER(?subjectP != ubbont:isSubjectOf && ?subjectP != skos:related && ?subjectP != skos:inScheme && ?subjectP != skos:narrower && ?subjectP != skos:broader &&?subjectP != ubbont:previousIdentifier)
        }
        OPTIONAL { 
        ?uri dct:spatial ?spatial . 
        ?spatial ?spatialP ?spatialO . 
      FILTER(?spatialP != skos:narrower && ?spatialP != skos:broader && ?spatialP != ubbont:previousIdentifier && ?spatialP != ubbont:locationFor)
      }
        OPTIONAL { 
          ?uri foaf:depicts ?depicts . 
        ?depicts ?depictsP ?depictsO .
        FILTER(?depictsP != foaf:depiction && ?depictsP != foaf:made) .
      }
        OPTIONAL { ?uri dct:description ?description . }
        OPTIONAL { ?uri dct:created ?created . }
        OPTIONAL { ?uri foaf:maker ?maker . }
      BIND (COALESCE(?imgMD,?imgSM,?mdImage,?smImage) AS ?image).
        BIND(iri(REPLACE(str(?uri), "data.ub.uib.no","marcus.uib.no","i")) as ?homepage) .
      } 
    }
  `
  return query
}

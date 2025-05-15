export const contracts = {
    "/some/dir/Document 1.pdf": {
      "classification": {
        "value": "Agreement",
        "confidence": 0.9,
        "reasoning": "While one classifier suggests 'Other' based on the filename alone, two classifiers confidently identify the document as an 'Agreement'. The reasoning highlights the document's title 'ABNAHMEPROTOKOLL' (acceptance protocol) and its content detailing the handover of rented stable parts, return of keys, and confirmation of no further claims, all strong indicators of an agreement being fulfilled."
      },
      "extension": "pdf"
    },
    "/some/other/dir/Document 2.pdf": {
      "classification": {
        "value": "Agreement",
        "confidence": 0.85,
        "reasoning": "All three files consistently classify the document as an \"Agreement\" related to the termination of a rental agreement. The presence of key terms like \"Kündigung\" (Termination), \"Mietobjekt\" (rental property), \"Mietvertrag\" (rental agreement), and \"6-monatigen Kündigungsfrist\" (6-month notice period) across the files, along with the specific mention of a building number and location, strongly supports this classification. The confidence scores are generally high, with file2 having the highest confidence at 0.95, further reinforcing the consensus."
      },
      "extension": "pdf"
    },
    "/some/other/dir/Document 3.pdf": {
      "classification": {
        "value": "Contract",
        "confidence": 0.95,
        "reasoning": "All three files confidently classify the document as a \"Contract\" with a high confidence score of 0.95. The consistent reasoning across the files points to the presence of German terms related to rental agreements, such as \"Mietvertrag,\" \"Vermieter,\" \"Mieter,\" \"Mietzins,\" and \"Mietdauer.\" The document's content, including details about rent, lease term, and termination, further supports this classification."
      },
      "extension": "pdf",
      "entities": {
        "Contract": {
          "Type": {
            "value": "MIETVERTRAG",
            "confidence": 1.0,
            "reasoning": "Found in both files"
          },
          "Subject": {
            "value": "Miet- oder Lagerfläche gemäß beiliegender Skizze",
            "confidence": 1.0,
            "reasoning": "Found in both files"
          },
          "Reference": {
            "value": null,
            "confidence": 1.0,
            "reasoning": "Found in both files"
          }
        },
        "Dates": {
          "Signing": {
            "value": "1992-03-01",
            "confidence": 1.0,
            "reasoning": "Found in both files"
          },
          "Effective": {
            "value": "1992-03-01",
            "confidence": 1.0,
            "reasoning": "Found in both files"
          },
          "Termination": {
            "value": null,
            "confidence": 1.0,
            "reasoning": "Found in both files"
          }
        },
        "Legal": {
          "Jurisdiction": {
            "value": null,
            "confidence": 1.0,
            "reasoning": "Found in both files"
          },
          "Language": {
            "value": null,
            "confidence": 1.0,
            "reasoning": "Found in both files"
          }
        },
        "Parties": [
          {
            "Role": {
              "value": "Vermieter",
              "confidence": 1.0,
              "reasoning": "Found in both files"
            },
            "Name": {
              "value": "Josef Gall",
              "confidence": 1.0,
              "reasoning": "Found in both files"
            },
            "Address": {
              "value": "B\\u00fcndte 8890 F1ums",
              "confidence": 0.5,
              "reasoning": "Found in file1, similar in file0"
            },
            "Representative": {
              "Name": {
                "value": null,
                "confidence": 1.0,
                "reasoning": "Found in both files"
              },
              "Title": {
                "value": "Landwirt",
                "confidence": 0.5,
                "reasoning": "Found in file1, similar in file0"
              }
            }
          },
          {
            "Role": {
              "value": "Mieter",
              "confidence": 1.0,
              "reasoning": "Found in both files"
            },
            "Name": {
              "value": "Versuchsstollen Hagerbach AG",
              "confidence": 1.0,
              "reasoning": "Found in both files"
            },
            "Address": {
              "value": "Postfach 64 7230 Sargans",
              "confidence": 0.5,
              "reasoning": "Found in file1, similar in file0"
            },
            "Representative": {
              "Name": {
                "value": null,
                "confidence": 1.0,
                "reasoning": "Found in both files"
              },
              "Title": {
                "value": null,
                "confidence": 1.0,
                "reasoning": "Found in both files"
              }
            }
          }
        ],
        "Terms": {
          "Obligations": [
            {
              "Party": {
                "value": "Mieter",
                "confidence": 0.5,
                "reasoning": "Found in file1 only"
              },
              "Description": {
                "value": "Zahlung von Fr. 600.--/Jahr Mietzins",
                "confidence": 0.5,
                "reasoning": "Found in file1 only"
              }
            },
            {
              "Party": {
                "value": ""
              }
            }
          ]
        }
      }
    },
    "/some/third/dir/Document 4.pdf": {
      "classification": {
        "value": "Agreement",
        "confidence": 0.92,
        "reasoning": "All three files confidently classify the document as an \"Agreement\". They highlight the document title \"Vereinbarung\" (Agreement in English), the presence of partnership terms, commission rates, payment terms, mutual obligations, and signatures as strong indicators of a formal agreement."
      },
      "extension": "pdf"
    },
    "/some/dir/Document 5.pdf": {
      "classification": {
        "value": "Other",
        "confidence": 0.93,
        "reasoning": "All three documents consistently classify the document as \"Other\" with high confidence scores (0.9, 0.95, 0.95). The reasoning consistently points to the presence of keywords related to cost estimates, such as \"Kostenvoranschlag\", \"Projektnummer\", \"E-Preis\", \"Total\", \"Mehrwertsteuer\", \"Mehr- Minderkosten\", and \"Gesamttotal\". This strong consensus and consistent evidence strongly suggest that the document is indeed related to cost estimation or a similar financial document."
      },
      "extension": "pdf"
    },
    "/some/third/dir/Document 6.pdf": {
      "classification": {
        "value": "Other",
        "confidence": 0.95,
        "reasoning": "All three files are classified as 'Other' with high confidence. File 0 appears to contain plans related to construction or woodworking. File 1 contains mostly graphical elements and unstructured text. File 2 is a scanned document lacking clear keywords or structure indicative of legal documents."
      },
      "extension": "pdf"
    },
    "/some/other/dir/Document 7.pdf": {
      "classification": {
        "value": "Contract",
        "confidence": 0.95,
        "reasoning": "All three files confidently classify the document as a \"Contract\" with a high confidence score of 0.95. The consistent and strong evidence across the files, including the document title \"Vertrag\" (German for \"Contract\"), the presence of typical contractual clauses, and signatures from involved parties, strongly supports this classification."
      },
      "extension": "pdf",
      "entities": {
        "Parties": [
          {
            "Role": "Buyer",
            "Name": "VersuchsStollen Hagerbach AG",
            "Address": "Rheinstrasse 4\nCH-7320 Sargans",
            "Representative": {
              "Name": "F. Amberg",
              "Title": null
            },
            "confidence": 1.0,
            "reasoning": "Combined entities from multiple files based on matching values for Role, Name, Address, Representative.Name."
          },
          {
            "Role": "Seller",
            "Name": "Schüpbach Holzbau AG",
            "Address": "Mungnau\n3436 Zollbrücke",
            "Representative": {
              "Name": "H.P. Schüpbach",
              "Title": null
            },
            "confidence": 1.0,
            "reasoning": "Combined entities from multiple files based on matching values for Role, Name, Representative.Name. Used address from file0 as it is more complete."
          }
        ],
        "Contract": {
          "Type": "Vertrag",
          "Subject": "Erstellung eines Bürogebäudes aus dem Info-Pavillon „San Bernardino“ und Ergänzungsbauten",
          "Reference": null,
          "confidence": 1.0,
          "reasoning": "Combined entities from multiple files based on matching values for Type. Used Subject from file0 as it is more detailed."
        },
        "Legal": {
          "Jurisdiction": "Flums, Schweiz",
          "Language": null,
          "confidence": 1.0,
          "reasoning": "No change in values across files."
        },
        "Dates": {
          "Signing": "2007-05-24",
          "Effective": null,
          "Termination": null,
          "confidence": 1.0,
          "reasoning": "No change in values across files."
        },
        "Terms": {
          "Obligations": [
            {
              "Party": "Seller",
              "Description": "Erstellung eines Bürogebäudes aus dem Info-Pavillon „San Bernardino“ und Ergänzungsbauten",
              "confidence": 1.0,
              "reasoning": "Combined similar obligations from both files based on semantic similarity and common party."
            },
            {
              "Party": "Seller",
              "Description": "Schlüsselfertige Aufstellung des Gebäudes",
              "confidence": 0.8,
              "reasoning": "Found only in file1, might be a specific detail."
            },
            {
              "Party": "Seller",
              "Description": "Behebung von Mängeln nach der Erstellung und vor der Abnahme",
              "confidence": 0.8,
              "reasoning": "Found only in file1, might be a specific detail."
            },
            {
              "Party": "Seller",
              "Description": "Bereitstellung aller bewilligungsnotwendigen Berechnungen",
              "confidence": 0.8,
              "reasoning": "Found only in file1, might be a specific detail."
            },
            {
              "Party": "Seller",
              "Description": "Lieferung von Plänen und technischen Angaben",
              "confidence": 1.0,
              "reasoning": "No change in values across files."
            },
            {
              "Party": "Seller",
              "Description": "Fundamentplan mit Definition der Belastungen und Vermassung der Auflagerpunkte",
              "confidence": 1.0,
              "reasoning": "No change in values across files."
            },
            {
              "Party": "Seller",
              "Description": "Energienachweis und Unterlagen für die Baubewilligung",
              "confidence": 1.0,
              "reasoning": "Combined similar obligations from both files based on semantic similarity and common party."
            },
            {
              "Party": "Seller",
              "Description": "Nachweis eines gesetzeskonformen genügenden Brandwiderstandes",
              "confidence": 1.0,
              "reasoning": "No change in values across files."
            },
            {
              "Party": "Seller",
              "Description": "Demontage und Abtransport des Infopavillon „San Bernardino\"",
              "confidence": 1.0,
              "reasoning": "No change in values across files."
            },
            {
              "Party": "Seller",
              "Description": "Lagerung der Elemente bis zum Baubeginn",
              "confidence": 1.0,
              "reasoning": "No change in values across files."
            },
            {
              "Party": "Seller",
              "Description": "Behebung von Schäden an der Konstruktion",
              "confidence": 1.0,
              "reasoning": "Combined similar obligations from both files based on semantic similarity and common party."
            },
            {
              "Party": "Seller",
              "Description": "Demontage der Elektro- und Sanitärinstallationen im Infopavillon",
              "confidence": 1.0,
              "reasoning": "No change in values across files."
            },
            {
              "Party": "Seller",
              "Description": "Lieferung der Ergänzungsbauten",
              "confidence": 1.0,
              "reasoning": "Combined similar obligations from both files based on semantic similarity and common party."
            },
            {
              "Party": "Seller",
              "Description": "Aufstellen und bezug"
            }
          ]
        }
      }
    }
}
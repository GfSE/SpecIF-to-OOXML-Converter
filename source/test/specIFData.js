/**
 * Created by Marcus Bätz on 12.04.2017.
 * Data-set updated to SpecIF v0.10.4.
 */
function specifData() {

    return {
        "id": "ACP-59c8a7730000bca80137509a49b1218b",
        "title": "Dimmer - Semantically Integrated Specification (2016-05-12)",
        "specifVersion": "0.10.4",
        "tool": "Interactive-Spec",
        "toolVersion": "0.92.31",
        "rights": {
            "title": "Creative Commons 4.0 CC BY-SA",
            "type": "dcterms:rights",
            "url": "https://creativecommons.org/licenses/by-sa/4.0/"
        },
        "createdAt": "2017-04-14T20:47:07.327Z",
        "createdBy": {
            "familyName": "von Dungern",
            "givenName": "Oskar",
            "org": {
                "organizationName": "adesso AG"
            },
            "email": {
                "type": "text/html",
                "value": "oskar.dungern@adesso.de"
            }
        },
        "dataTypes": [{
            "id": "DT-Boolean",
            "title": "Boolean",
            "type": "xs:boolean",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00"
        }, {
            "id": "DT-Byte",
            "title": "Byte",
            "type": "xs:integer",
            "min": 0,
            "max": 255,
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00"
        }, {
            "id": "DT-Integer",
            "title": "Integer",
            "type": "xs:integer",
            "min": -32768,
            "max": 32767,
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00"
        }, {
            "id": "DT-Real",
            "title": "Real",
            "type": "xs:double",
            "accuracy": 5,
            "min": -10000,
            "max": 10000,
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00"
        }, {
            "id": "DT-Decimal2",
            "title": "Real with 2 Decimals",
            "type": "xs:double",
            "accuracy": 2,
            "min": -10000,
            "max": 10000,
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00"
        }, {
            "id": "DT-Date",
            "title": "Date or Timestamp",
            "type": "xs:dateTime",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00"
        }, {
            "id": "DT-ShortString",
            "title": "String[96]",
            "description": "String with length 96",
            "type": "xs:string",
            "maxLength": 96,
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00"
        }, {
            "id": "DT-String",
            "title": "String[512]",
            "description": "String with length 512",
            "type": "xs:string",
            "maxLength": 512,
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00"
        }, {
            "id": "DT-Text",
            "title": "dcterms:description",
            "description": "String with length 8192",
            "type": "xs:string",
            "maxLength": 8192,
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00"
        }, {
            "id": "DT-URL",
            "title": "URL",
            "type": "xs:string",
            "maxLength": 1024,
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00"
        }, {
            "id": "DT-EmailAddress",
            "title": "E-mail",
            "type": "xs:string",
            "maxLength": 256,
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00"
        }, {
            "id": "DT-FormattedText",
            "title": "Formatted Text",
            "type": "xhtml",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00"
        }, {
            "id": "DT-Req-Status",
            "title": "SpecIF.State",
            "description": "Enumerated values for requirement status",
            "type": "xs:enumeration",
            "values": [{
                "id": "V-Req-Status-0",
                "title": "00_deprecated"
            }, {
                "id": "V-Req-Status-1",
                "title": "00_rejected"
            }, {
                "id": "V-Req-Status-2",
                "title": "10_initial"
            }, {
                "id": "V-Req-Status-3",
                "title": "20_drafted"
            }, {
                "id": "V-Req-Status-4",
                "title": "30_submitted"
            }, {
                "id": "V-Req-Status-5",
                "title": "40_approved"
            }, {
                "id": "V-Req-Status-6",
                "title": "60_completed"
            }, {
                "id": "V-Req-Status-7",
                "title": "80_released"
            }],
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00"
        }, {
            "id": "DT-Req-Priority",
            "title": "SpecIF.Priority",
            "description": "Enumerated values for requirement priority",
            "type": "xs:enumeration",
            "values": [{
                "id": "V-Req-Prio-0",
                "title": "1_high"
            }, {
                "id": "V-Req-Prio-1",
                "title": "2_medium"
            }, {
                "id": "V-Req-Prio-2",
                "title": "3_low"
            }],
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00"
        }, {
            "id": "DT-Pln-custom.status",
            "title": "Status",
            "description": "Enumerated values for plan custom.status",
            "type": "xs:enumeration",
            "values": [{
                "id": "V-Pln-custom.status-0",
                "title": "00_deprecated"
            }, {
                "id": "V-Pln-custom.status-1",
                "title": "00_rejected"
            }, {
                "id": "V-Pln-custom.status-2",
                "title": "30_submitted"
            }, {
                "id": "V-Pln-custom.status-3",
                "title": "40_approved"
            }, {
                "id": "V-Pln-custom.status-4",
                "title": "60_completed"
            }, {
                "id": "V-Pln-custom.status-5",
                "title": "80_released"
            }],
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00"
        }, {
            "id": "DT-Pln-custom.supplier-status",
            "title": "Supplier Status",
            "description": "Enumerated values for plan custom.supplier-status",
            "type": "xs:enumeration",
            "values": [{
                "id": "V-Pln-custom.supplier-status-0",
                "title": "not-applicable"
            }, {
                "id": "V-Pln-custom.supplier-status-1",
                "title": "to-clarify"
            }, {
                "id": "V-Pln-custom.supplier-status-2",
                "title": "agreed"
            }, {
                "id": "V-Pln-custom.supplier-status-3",
                "title": "partly-agreed"
            }, {
                "id": "V-Pln-custom.supplier-status-4",
                "title": "not-agreed"
            }],
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00"
        }, {
            "id": "DT-Pln-custom.oem-status",
            "title": "OEM Status",
            "description": "Enumerated values for plan custom.oem-status",
            "type": "xs:enumeration",
            "values": [{
                "id": "V-Pln-custom.oem-status-0",
                "title": "not-to-evaluate"
            }, {
                "id": "V-Pln-custom.oem-status-1",
                "title": "to-evaluate"
            }, {
                "id": "V-Pln-custom.oem-status-2",
                "title": "accepted"
            }, {
                "id": "V-Pln-custom.oem-status-3",
                "title": "not-accepted"
            }],
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00"
        }, {
            "id": "DT-Req-custom.perspective",
            "title": "Perspective",
            "description": "Enumerated values for requirement custom.perspective",
            "type": "xs:enumeration",
            "values": [{
                "id": "V-Req-custom.perspective-0",
                "title": "Business"
            }, {
                "id": "V-Req-custom.perspective-1",
                "title": "User"
            }, {
                "id": "V-Req-custom.perspective-2",
                "title": "System"
            }],
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00"
        }, {
            "id": "DT-Req-custom.discipline",
            "title": "Discipline",
            "description": "Enumerated values for requirement custom.discipline",
            "type": "xs:enumeration",
            "values": [{
                "id": "V-Req-custom.discipline-0",
                "title": "Mechanics"
            }, {
                "id": "V-Req-custom.discipline-1",
                "title": "Electronics"
            }, {
                "id": "V-Req-custom.discipline-2",
                "title": "Software"
            }, {
                "id": "V-Req-custom.discipline-3",
                "title": "Safety"
            }],
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00"
        }, {
            "id": "DT-Req-custom.supplier-status",
            "title": "Supplier Status",
            "description": "Enumerated values for requirement custom.supplier-status",
            "type": "xs:enumeration",
            "values": [{
                "id": "V-Req-custom.supplier-status-0",
                "title": "not-applicable"
            }, {
                "id": "V-Req-custom.supplier-status-1",
                "title": "to-clarify"
            }, {
                "id": "V-Req-custom.supplier-status-2",
                "title": "agreed"
            }, {
                "id": "V-Req-custom.supplier-status-3",
                "title": "partly-agreed"
            }, {
                "id": "V-Req-custom.supplier-status-4",
                "title": "not-agreed"
            }],
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00"
        }, {
            "id": "DT-Req-custom.oem-status",
            "title": "OEM Status",
            "description": "Enumerated values for requirement custom.oem-status",
            "type": "xs:enumeration",
            "values": [{
                "id": "V-Req-custom.oem-status-0",
                "title": "not-to-evaluate"
            }, {
                "id": "V-Req-custom.oem-status-1",
                "title": "to-evaluate"
            }, {
                "id": "V-Req-custom.oem-status-2",
                "title": "accepted"
            }, {
                "id": "V-Req-custom.oem-status-3",
                "title": "not-accepted"
            }],
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00"
        }, {
            "id": "DT-Iss-Status",
            "title": "SpecIF.State",
            "description": "Enumerated values for issue status",
            "type": "xs:enumeration",
            "values": [{
                "id": "V-Iss-Status-0",
                "title": ""
            }, {
                "id": "V-Iss-Status-1",
                "title": "open"
            }, {
                "id": "V-Iss-Status-2",
                "title": "assigned"
            }, {
                "id": "V-Iss-Status-3",
                "title": "in progress"
            }, {
                "id": "V-Iss-Status-4",
                "title": "closed"
            }, {
                "id": "V-Iss-Status-5",
                "title": "reopened"
            }, {
                "id": "V-Iss-Status-6",
                "title": "rejected"
            }],
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00"
        }, {
            "id": "DT-Iss-Priority",
            "title": "SpecIF.Priority",
            "description": "Enumerated values for issue priority",
            "type": "xs:enumeration",
            "values": [{
                "id": "V-Iss-Prio-0",
                "title": ""
            }, {
                "id": "V-Iss-Prio-1",
                "title": "low"
            }, {
                "id": "V-Iss-Prio-2",
                "title": "medium"
            }, {
                "id": "V-Iss-Prio-3",
                "title": "high"
            }],
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00"
        }],
        "resourceClasses": [{
            "id": "OT-Fld",
            "title": "SpecIF:Heading",
            "description": "Folders with title and text for chapters or descriptive paragraphs.",
			"isHeading": true,
            "propertyClasses": [{
                "id": "AD-Fld-Name",
                "title": "SpecIF:Heading",
                "dataType": "DT-ShortString",
                "revision": 1,
                "changedAt": "2016-05-26T08:59:00+02:00"
            }, {
                "id": "AD-Fld-Text",
                "title": "dcterms:description",
                "dataType": "DT-FormattedText",
                "revision": 1,
                "changedAt": "2016-05-26T08:59:00+02:00"
            }, {
                "id": "AD-Fld-Type",
                "title": "SpecIF:Type",
                "dataType": "DT-ShortString",
                "revision": 1,
                "changedAt": "2016-05-26T08:59:00+02:00"
            }],
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "creation": ["manual"]
        }, {
            "id": "OT-Pln",
            "title": "SpecIF:Diagram",
            "description": "A 'Diagram' is a graphical model view with a specific communication purpose, e.g. a business process or system composition.",
            "icon": "▣",
            "propertyClasses": [{
                "id": "AD-Pln-Name",
                "title": "dcterms:title",
                "dataType": "DT-ShortString",
                "revision": 1,
                "changedAt": "2016-05-26T08:59:00+02:00"
            }, {
                "id": "AD-Pln-Text",
                "title": "dcterms:description",
                "dataType": "DT-FormattedText",
                "revision": 1,
                "changedAt": "2016-05-26T08:59:00+02:00"
            }, {
                "id": "AD-Pln-Type",
                "title": "SpecIF:Type",
                "dataType": "DT-ShortString",
                "revision": 1,
                "changedAt": "2016-05-26T08:59:00+02:00"
            }, {
                "id": "AD-Pln-custom.status",
                "title": "Status",
                "dataType": "DT-Pln-custom.status",
                "multiple": false,
                "revision": 1,
                "changedAt": "2016-05-26T08:59:00+02:00"
            }, {
                "id": "AD-Pln-custom.supplier-status",
                "title": "Supplier Status",
                "dataType": "DT-Pln-custom.supplier-status",
                "multiple": false,
                "revision": 1,
                "changedAt": "2016-05-26T08:59:00+02:00"
            }, {
                "id": "AD-Pln-custom.supplier-comment",
                "title": "Supplier Comment",
                "dataType": "DT-Text",
                "revision": 1,
                "changedAt": "2016-05-26T08:59:00+02:00"
            }, {
                "id": "AD-Pln-custom.oem-status",
                "title": "OEM Status",
                "dataType": "DT-Pln-custom.oem-status",
                "multiple": false,
                "revision": 1,
                "changedAt": "2016-05-26T08:59:00+02:00"
            }, {
                "id": "AD-Pln-custom.oem-comment",
                "title": "OEM Comment",
                "dataType": "DT-Text",
                "revision": 1,
                "changedAt": "2016-05-26T08:59:00+02:00"
            }],
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "creation": ["auto"]
        }, {
            "id": "OT-Act",
            "title": "FMC:Actor",
            "description": "An 'Actor' is a fundamental model element type representing an active entity, be it an activity, a process step, a function, a system component or a role.",
            "icon": "■",
            "propertyClasses": [{
                "id": "AD-Act-Name",
                "title": "dcterms:title",
                "dataType": "DT-ShortString",
                "revision": 1,
                "changedAt": "2016-05-26T08:59:00+02:00"
            }, {
                "id": "AD-Act-Text",
                "title": "dcterms:description",
                "dataType": "DT-FormattedText",
                "revision": 1,
                "changedAt": "2016-05-26T08:59:00+02:00"
            }, {
                "id": "AD-Act-Type",
                "title": "SpecIF:Type",
                "dataType": "DT-ShortString",
                "revision": 1,
                "changedAt": "2016-05-26T08:59:00+02:00"
            }],
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "creation": ["auto"]
        }, {
            "id": "OT-Sta",
            "title": "FMC:State",
            "description": "A 'State' is a fundamental model element type representing a passive entity, be it a value, a condition, an information storage or even a physical shape.",
            "icon": "●",
            "propertyClasses": [{
                "id": "AD-Sta-Name",
                "title": "dcterms:title",
                "dataType": "DT-ShortString",
                "revision": 1,
                "changedAt": "2016-05-26T08:59:00+02:00"
            }, {
                "id": "AD-Sta-Text",
                "title": "dcterms:description",
                "dataType": "DT-FormattedText",
                "revision": 1,
                "changedAt": "2016-05-26T08:59:00+02:00"
            }, {
                "id": "AD-Sta-Type",
                "title": "SpecIF:Type",
                "dataType": "DT-ShortString",
                "revision": 1,
                "changedAt": "2016-05-26T08:59:00+02:00"
            }],
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "creation": ["auto"]
        }, {
            "id": "OT-Evt",
            "title": "FMC:Event",
            "description": "An 'Event' is a fundamental model element type representing a time reference, a change in condition/value or more generally a synchronisation primitive.",
            "icon": "♦",
            "propertyClasses": [{
                "id": "AD-Evt-Name",
                "title": "dcterms:title",
                "dataType": "DT-ShortString",
                "revision": 1,
                "changedAt": "2016-05-26T08:59:00+02:00"
            }, {
                "id": "AD-Evt-Text",
                "title": "dcterms:description",
                "dataType": "DT-FormattedText",
                "revision": 1,
                "changedAt": "2016-05-26T08:59:00+02:00"
            }, {
                "id": "AD-Evt-Type",
                "title": "SpecIF:Type",
                "dataType": "DT-ShortString",
                "revision": 1,
                "changedAt": "2016-05-26T08:59:00+02:00"
            }],
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "creation": ["auto"]
        }, {
            "id": "OT-Req",
            "title": "SpecIF:Requirement",
            "description": "A 'Requirement' is a singular documented physical and functional need that a particular design, product or process must be able to perform.",
            "icon": "↯",
            "propertyClasses": [{
                "id": "AD-Req-ID",
                "title": "dcterms:identifier",
                "dataType": "DT-ShortString",
                "revision": 1,
                "changedAt": "2016-05-26T08:59:00+02:00"
            }, {
                "id": "AD-Req-Name",
                "title": "dcterms:title",
                "dataType": "DT-ShortString",
                "revision": 1,
                "changedAt": "2016-05-26T08:59:00+02:00"
            }, {
                "id": "AD-Req-Text",
                "title": "dcterms:description",
                "dataType": "DT-FormattedText",
                "revision": 1,
                "changedAt": "2016-05-26T08:59:00+02:00"
            }, {
                "id": "AD-Req-Type",
                "title": "SpecIF:Type",
                "dataType": "DT-ShortString",
                "revision": 1,
                "changedAt": "2016-05-26T08:59:00+02:00"
            }, {
                "id": "AD-Req-Status",
                "title": "SpecIF:State",
                "dataType": "DT-Req-Status",
                "multiple": false,
                "revision": 1,
                "changedAt": "2016-05-26T08:59:00+02:00"
            }, {
                "id": "AD-Req-Priority",
                "title": "SpecIF:Priority",
                "dataType": "DT-Req-Priority",
                "multiple": false,
                "revision": 1,
                "changedAt": "2016-05-26T08:59:00+02:00"
            }, {
                "id": "AD-Req-custom.perspective",
                "title": "Perspective",
                "dataType": "DT-Req-custom.perspective",
                "multiple": false,
                "revision": 1,
                "changedAt": "2016-05-26T08:59:00+02:00"
            }, {
                "id": "AD-Req-custom.discipline",
                "title": "Discipline",
                "dataType": "DT-Req-custom.discipline",
                "multiple": true,
                "revision": 1,
                "changedAt": "2016-05-26T08:59:00+02:00"
            }, {
                "id": "AD-Req-custom.supplier-status",
                "title": "Supplier Status",
                "dataType": "DT-Req-custom.supplier-status",
                "multiple": false,
                "revision": 1,
                "changedAt": "2016-05-26T08:59:00+02:00"
            }, {
                "id": "AD-Req-custom.supplier-comment",
                "title": "Supplier Comment",
                "dataType": "DT-Text",
                "revision": 1,
                "changedAt": "2016-05-26T08:59:00+02:00"
            }, {
                "id": "AD-Req-custom.oem-status",
                "title": "OEM Status",
                "dataType": "DT-Req-custom.oem-status",
                "multiple": false,
                "revision": 1,
                "changedAt": "2016-05-26T08:59:00+02:00"
            }, {
                "id": "AD-Req-custom.oem-comment",
                "title": "OEM Comment",
                "dataType": "DT-Text",
                "revision": 1,
                "changedAt": "2016-05-26T08:59:00+02:00"
            }],
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "creation": ["manual"]
        }, {
            "id": "OT-Iss",
            "title": "SpecIF:Issue",
            "description": "An 'Issue' is a question to answer or decision to take which is worth tracking.",
            "propertyClasses": [{
                "id": "AD-Iss-ObjectID",
                "title": "dcterms:identifier",
                "dataType": "DT-ShortString",
                "revision": 1,
                "changedAt": "2016-05-26T08:59:00+02:00"
            }, {
                "id": "AD-Iss-Name",
                "title": "dcterms:title",
                "dataType": "DT-ShortString",
                "revision": 1,
                "changedAt": "2016-05-26T08:59:00+02:00"
            }, {
                "id": "AD-Iss-Text",
                "title": "dcterms:description",
                "dataType": "DT-FormattedText",
                "revision": 1,
                "changedAt": "2016-05-26T08:59:00+02:00"
            }, {
                "id": "AD-Iss-Type",
                "title": "SpecIF:Type",
                "dataType": "DT-ShortString",
                "revision": 1,
                "changedAt": "2016-05-26T08:59:00+02:00"
            }, {
                "id": "AD-Iss-Status",
                "title": "SpecIF:State",
                "dataType": "DT-Iss-Status",
                "multiple": false,
                "revision": 1,
                "changedAt": "2016-05-26T08:59:00+02:00"
            }, {
                "id": "AD-Iss-Priority",
                "title": "SpecIF:Priority",
                "dataType": "DT-Iss-Priority",
                "multiple": false,
                "revision": 1,
                "changedAt": "2016-05-26T08:59:00+02:00"
            }, {
                "id": "AD-Iss-Responsible",
                "title": "SpecIF:Responsible",
                "dataType": "DT-ShortString",
                "revision": 1,
                "changedAt": "2016-05-26T08:59:00+02:00"
            }, {
                "id": "AD-Iss-DueDate",
                "title": "SpecIF:DueDate",
                "dataType": "DT-Date",
                "revision": 1,
                "changedAt": "2016-05-26T08:59:00+02:00"
            }],
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "creation": ["manual", "auto"]
        }, {
            "id": "OT-7JqJXpVvtCf36YY7lGKespKXRoi",
            "title": "SpecIF:Comment",
            "description": "A comment referring to a model element, such as actor, state, event, requirement, feature or folder.",
            "propertyClasses": [{
                "id": "AD-Qzs0PxYK8lXagUMdQ3l82Ai8RXN",
                "title": "dcterms:description",
                "description": "The comment text",
                "dataType": "DT-Text",
                "revision": 2,
                "changedAt": "2016-10-25T23:44:15+02:00"
            }],
            "revision": 2,
            "changedAt": "2016-10-25T23:44:15+02:00",
            "changedBy": "od",
            "creation": ["auto"]
        }],
        "statementClasses": [{
            "id": "RT-Visibility",
            "title": "SpecIF:shows",
            "description": "Relation: Plan shows Model-Element",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "creation": ["auto"],
            "subjectClasses": ["OT-Pln"],
            "objectClasses": ["OT-Act", "OT-Sta", "OT-Evt"]
        }, {
            "id": "RT-Containment",
            "title": "SpecIF:contains",
            "description": "Relation: Model-Element contains Model-Element",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "creation": ["auto", "manual"],
            "subjectTypes": ["OT-Act", "OT-Sta", "OT-Evt"],
            "objectTypes": ["OT-Act", "OT-Sta", "OT-Evt"]
        }, {
            "id": "RT-Storage",
            "title": "SpecIF:modifies",
            "description": "Relation: Actor (Role, Function) writes and reads State (Information)",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "creation": ["auto"],
            "subjectTypes": ["OT-Act"],
            "objectTypes": ["OT-Sta"]
        }, {
            "id": "RT-Writing",
            "title": "SpecIF:writes",
            "description": "Relation: Actor (Role, Function) writes State (Information)",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "creation": ["auto"],
            "subjectTypes": ["OT-Act"],
            "objectTypes": ["OT-Sta"]
        }, {
            "id": "RT-Reading",
            "title": "SpecIF:reads",
            "description": "Relation: Actor (Role, Function) reads State (Information)",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "creation": ["auto"],
            "subjectTypes": ["OT-Act"],
            "objectTypes": ["OT-Sta"]
        }, {
            "id": "RT-Dependency",
            "title": "SpecIF:dependsOn",
            "description": "Relation: Requirement/Feature depends on Requirement/Feature",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "creation": ["manual"],
            "subjectTypes": ["OT-Req"],
            "objectTypes": ["OT-Req"]
        }, {
            "id": "RT-Satisfaction",
            "title": "oslc_rm:satisfies",
            "description": "Relation: Model-Element satisfies Requirement",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "creation": ["manual"],
            "subjectTypes": ["OT-Act", "OT-Sta", "OT-Evt"],
            "objectTypes": ["OT-Req"]
        }, {
            "id": "RT-Concern",
            "title": "SpecIF:refersTo",
            "description": "Relation: Open Issue concerns Plan/Model-Element/Requirement",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "creation": ["manual", "auto"],
            "subjectTypes": ["OT-Iss"],
            "objectTypes": ["OT-Pln", "OT-Act", "OT-Sta", "OT-Evt", "OT-Req"]
        }, {
            "id": "RT-qESYDCMe9bhCs4dIQNgs5VgQG5X",
            "title": "SpecIF:commentRefersTo",
            "description": "Relation: Comment refers to a model element, such as actor, state, event, requirement, feature or folder.",
            "revision": 2,
            "changedAt": "2016-10-25T23:44:15+02:00",
            "changedBy": "od",
            "creation": ["auto"],
            "subjectTypes": ["OT-7JqJXpVvtCf36YY7lGKespKXRoi"]
        }],
        "hierarchyClasses": [{
            "id": "ST-ACProject",
            "title": "SpecIF:Hierarchy",
            "description": "Root node of a specification (outline).",
            "propertyClasses": [{
                "id": "AD-ACProject-Name",
                "title": "dcterms:title",
                "dataType": "DT-ShortString",
                "revision": 1,
                "changedAt": "2016-05-26T08:59:00+02:00"
            }, {
                "id": "AD-ACProject-Text",
                "title": "dcterms:description",
                "dataType": "DT-FormattedText",
                "revision": 1,
                "changedAt": "2016-05-26T08:59:00+02:00"
            }],
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00"
        }],
        "resources": [{
            "id": "Fld-59c8a7730000bca80137509a49b1218b-info",
            "title": "Project Information",
            "properties": [{
                "title": "SpecIF:Heading",
                "class": "AD-Fld-Name",
                "value": "Project Information"
            }, {
                "title": "dcterms:description",
                "class": "AD-Fld-Text",
                "value": "<div> <object data=\"http://adesso.de\" ><object data=\"files_and_images/Logo-adesso.png\" type=\"image/png\" >Logo-adesso.png</object></object><p> <br /><br /> <br /> </p><p> This specification method integrates and represents: </p><ul> <li> processes, system composition and requirements (dynamic, static and detail views) </li> <li> mechanic, electric and software components with their interfaces. </li></ul><p></p><p> It is important to understand, that all plans (diagrams) are views of a common system engineering model, sometimes called 'system repository'. Thus, consistency is always maintained. </p><p></p><p> The model elements are connected with statements, most of which are defined by positioning graph elements. For example, if a system component is drawn within another, a relationship 'contains' is created in the logic representation of the engineering model. Other statements, such as a system component 'complies-with' a requirement are created manually. </p><p></p><p> Also, the documents are generated from the system engineering model. The ordering is in most projects (it can be rearranged, however, if appropriate): </p><ul> <li> All plans </li> <li> A glossary with descriptions of all model elements appearing on one or more plans </li> <li> A hierarchically ordered list of requirements </li> <li> A list of open issues. </li></ul><p> Please note that plans list related model elements and model elements list related requirements .. and vice versa. Active hyper-links are used, so that it is easy to jump between related model elements. </p><p></p><p class=\"inline-label\"> Stakeholders: </p><table class=\"stdInlineWithBorder\"> <tbody> <tr> <th> Name </th> <th> Organisation </th> <th> Telephone </th> <th> Email </th> </tr> <tr> <td> Vorname Nachname </td> <td> Hersteller AG </td> <td> </td> <td> </td> </tr> </tbody></table><p> <br /> </p><p class=\"inline-label\"> Legend: </p><p> To distinguish their type, element names are preceded by one of the following symbols: </p><table class=\"stdInlineWithBorder\"> <tbody> <tr> <td> ▣ </td> <td> Plan </td> <td> A 'Diagram' is a graphical model view with a specific communication purpose, e.g. a business process or system composition. </td> </tr> <tr> <td> ■ </td> <td> Actor (Role, Function) </td> <td> An 'Actor' is a fundamental model element type representing an active entity, be it an activity, a process step, a function, a system component or a role. </td> </tr> <tr> <td> ● </td> <td> State (Information) </td> <td> A 'State' is a fundamental model element type representing a passive entity, be it a value, a condition, an information storage or even a physical shape. </td> </tr> <tr> <td> ♦ </td> <td> Event </td> <td> An 'Event' is a fundamental model element type representing a time reference, a change in condition/value or more generally a synchronisation primitive. </td> </tr> <tr> <td> ✶ </td> <td> Feature </td> <td> A 'Feature' is an intentional distinguishing characteristic of a system, often a unique selling proposition. </td> </tr> <tr> <td> ↯ </td> <td> Requirement </td> <td> A 'Requirement' is a singular documented physical and functional need that a particular design, product or process must be able to perform. </td> </tr> </tbody></table><p class=\"sceditor-nlf\"> <br /></p></div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Fld-Type",
                "value": "Folder"
            }],
            "revision": 36,
            "changedAt": "2016-12-06T13:39:25+01:00",
            "changedBy": "od",
            "class": "OT-Fld"
        }, {
            "id": "Fld-5a5f54090000bca801375b04a668f1a7",
            "title": "System Composition",
            "properties": [{
                "title": "SpecIF:Heading",
                "class": "AD-Fld-Name",
                "value": "System Composition"
            }, {
                "title": "dcterms:description",
                "class": "AD-Fld-Text",
                "value": "<div><p>.. showing the system and its composition of modules (at a higher level) and components (at a lower level). The relevant interfaces between the disciplines mechanical, electrical and software engineering are shown.</p> </div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Fld-Type",
                "value": "Folder"
            }],
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "OT-Fld"
        }, {
            "id": "Pln-27420ffc0000c3a8013ab527ca1b71f5",
            "title": "Color coding",
            "properties": [{
                "title": "dcterms:title",
                "class": "AD-Pln-Name",
                "value": "Color coding"
            }, {
                "title": "dcterms:description",
                "class": "AD-Pln-Text",
                "value": "<div><p class=\"inline-label\"> Model View: </p><div class=\"forImage\" style=\"max-width: 480px;\" > <object data=\"files_and_images/27420ffc0000c3a8013ab527ca1b71f5.svg\" type=\"image/svg+xml\" >files_and_images\\27420ffc0000c3a8013ab527ca1b71f5.svg</object></div></div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Pln-Type",
                "value": "FMC Block Diagram"
            }, {
                "title": "Status",
                "class": "AD-Pln-custom.status",
                "value": "V-Pln-custom.status-5"
            }, {
                "title": "Supplier Status",
                "class": "AD-Pln-custom.supplier-status",
                "value": "V-Pln-custom.supplier-status-0"
            }, {
                "title": "Supplier Comment",
                "class": "AD-Pln-custom.supplier-comment",
                "value": ""
            }, {
                "title": "OEM Status",
                "class": "AD-Pln-custom.oem-status",
                "value": "V-Pln-custom.oem-status-0"
            }, {
                "title": "OEM Comment",
                "class": "AD-Pln-custom.oem-comment",
                "value": ""
            }],
            "revision": 45,
            "changedAt": "2016-12-06T13:54:47+01:00",
            "changedBy": "od",
            "class": "OT-Pln"
        }, {
            "id": "Pln-5a4755dd0000bca801375293a62c90a8",
            "title": "SmartHome System",
            "properties": [{
                "title": "dcterms:title",
                "class": "AD-Pln-Name",
                "value": "SmartHome System"
            }, {
                "title": "dcterms:description",
                "class": "AD-Pln-Text",
                "value": "<div><p> The Smart-Home-System consists of sensors on the left side, the controller in the middle and the actuators on the right side. </p><p class=\"inline-label\"> Model View: </p><div class=\"forImage\" style=\"max-width: 600px;\"> <object data=\"files_and_images/5a4755dd0000bca801375293a62c90a8.svg\" type=\"image/svg+xml\" >files_and_images\\5a4755dd0000bca801375293a62c90a8.svg</object></div></div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Pln-Type",
                "value": "FMC Block Diagram"
            }, {
                "title": "Status",
                "class": "AD-Pln-custom.status",
                "value": "V-Pln-custom.status-2"
            }, {
                "title": "Supplier Status",
                "class": "AD-Pln-custom.supplier-status",
                "value": "V-Pln-custom.supplier-status-1"
            }, {
                "title": "Supplier Comment",
                "class": "AD-Pln-custom.supplier-comment",
                "value": ""
            }, {
                "title": "OEM Status",
                "class": "AD-Pln-custom.oem-status",
                "value": "V-Pln-custom.oem-status-1"
            }, {
                "title": "OEM Comment",
                "class": "AD-Pln-custom.oem-comment",
                "value": ""
            }],
            "revision": 70,
            "changedAt": "2017-01-05T12:53:19+01:00",
            "changedBy": "od",
            "class": "OT-Pln"
        }, {
            "id": "Pln-5a6cdea50000bca80137d6b2d6e8a3a0",
            "title": "Flush-mounted Dimmer",
            "properties": [{
                "title": "dcterms:title",
                "class": "AD-Pln-Name",
                "value": "Flush-mounted Dimmer"
            }, {
                "title": "dcterms:description",
                "class": "AD-Pln-Text",
                "value": "<div><p> .. showing the components of the device with their interfaces. </p><p class=\"inline-label\"> Model View: </p><div class=\"forImage\" style=\"max-width: 600px;\" > <object data=\"files_and_images/5a6cdea50000bca80137d6b2d6e8a3a0.svg\" type=\"image/svg+xml\" >files_and_images\\5a6cdea50000bca80137d6b2d6e8a3a0.svg</object></div></div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Pln-Type",
                "value": "FMC Block Diagram"
            }, {
                "title": "Status",
                "class": "AD-Pln-custom.status",
                "value": "V-Pln-custom.status-2"
            }, {
                "title": "Supplier Status",
                "class": "AD-Pln-custom.supplier-status",
                "value": "V-Pln-custom.supplier-status-4"
            }, {
                "title": "Supplier Comment",
                "class": "AD-Pln-custom.supplier-comment",
                "value": ""
            }, {
                "title": "OEM Status",
                "class": "AD-Pln-custom.oem-status",
                "value": "V-Pln-custom.oem-status-3"
            }, {
                "title": "OEM Comment",
                "class": "AD-Pln-custom.oem-comment",
                "value": ""
            }],
            "revision": 47,
            "changedAt": "2016-12-06T13:55:21+01:00",
            "changedBy": "od",
            "class": "OT-Pln"
        }, {
            "id": "Pln-5a7f99af0000bca8013754f2ef12d3e5",
            "title": "Dimmer Module",
            "properties": [{
                "title": "dcterms:title",
                "class": "AD-Pln-Name",
                "value": "Dimmer Module"
            }, {
                "title": "dcterms:description",
                "class": "AD-Pln-Text",
                "value": "<div><p class=\"inline-label\"> Model View: </p><div class=\"forImage\" style=\"max-width: 600px;\" > <object data=\"files_and_images/5a7f99af0000bca8013754f2ef12d3e5.svg\" type=\"image/svg+xml\" >files_and_images\\5a7f99af0000bca8013754f2ef12d3e5.svg</object></div></div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Pln-Type",
                "value": "FMC Block Diagram"
            }, {
                "title": "Status",
                "class": "AD-Pln-custom.status",
                "value": "V-Pln-custom.status-2"
            }, {
                "title": "Supplier Status",
                "class": "AD-Pln-custom.supplier-status",
                "value": "V-Pln-custom.supplier-status-3"
            }, {
                "title": "Supplier Comment",
                "class": "AD-Pln-custom.supplier-comment",
                "value": ""
            }, {
                "title": "OEM Status",
                "class": "AD-Pln-custom.oem-status",
                "value": "V-Pln-custom.oem-status-1"
            }, {
                "title": "OEM Comment",
                "class": "AD-Pln-custom.oem-comment",
                "value": ""
            }],
            "revision": 48,
            "changedAt": "2016-12-06T13:55:34+01:00",
            "changedBy": "od",
            "class": "OT-Pln"
        }, {
            "id": "Fld-5af3154d0000bca801379748537d7388",
            "title": "Scenarios",
            "properties": [{
                "title": "SpecIF:Heading",
                "class": "AD-Fld-Name",
                "value": "Scenarios"
            }, {
                "title": "dcterms:description",
                "class": "AD-Fld-Text",
                "value": "<div><p>.. showing the behavioral aspects of system design, both from external user perspective ('black box') and from internal perspective ('white box').</p> </div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Fld-Type",
                "value": "Folder"
            }],
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "OT-Fld"
        }, {
            "id": "Fld-5b6a99f10000bca80137b78cda65fc07",
            "title": "Dimming",
            "properties": [{
                "title": "SpecIF:Heading",
                "class": "AD-Fld-Name",
                "value": "Dimming"
            }, {
                "title": "dcterms:description",
                "class": "AD-Fld-Text",
                "value": "<div> </div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Fld-Type",
                "value": "Folder"
            }],
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "OT-Fld"
        }, {
            "id": "Pln-606e76c70000bca801376ec3133a1181",
            "title": "User Activity",
            "properties": [{
                "title": "dcterms:title",
                "class": "AD-Pln-Name",
                "value": "User Activity"
            }, {
                "title": "dcterms:description",
                "class": "AD-Pln-Text",
                "value": "<div><p> This shows the defined sequences of manual operation to activate the device. </p><p class=\"inline-label\"> Model View: </p><div class=\"forImage\" style=\"max-width: 600px;\" > <object data=\"files_and_images/606e76c70000bca801376ec3133a1181.svg\" type=\"image/svg+xml\" >files_and_images\\606e76c70000bca801376ec3133a1181.svg</object></div></div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Pln-Type",
                "value": "BPMN Process Model"
            }, {
                "title": "Status",
                "class": "AD-Pln-custom.status",
                "value": "V-Pln-custom.status-3"
            }, {
                "title": "Supplier Status",
                "class": "AD-Pln-custom.supplier-status",
                "value": "V-Pln-custom.supplier-status-2"
            }, {
                "title": "Supplier Comment",
                "class": "AD-Pln-custom.supplier-comment",
                "value": ""
            }, {
                "title": "OEM Status",
                "class": "AD-Pln-custom.oem-status",
                "value": "V-Pln-custom.oem-status-2"
            }, {
                "title": "OEM Comment",
                "class": "AD-Pln-custom.oem-comment",
                "value": ""
            }],
            "revision": 49,
            "changedAt": "2016-12-06T13:55:50+01:00",
            "changedBy": "od",
            "class": "OT-Pln"
        }, {
            "id": "Pln-45a1c8930000c3a801414cd1eaa70b5a",
            "title": "Double-Button Observer Software",
            "properties": [{
                "title": "dcterms:title",
                "class": "AD-Pln-Name",
                "value": "Double-Button Observer Software"
            }, {
                "title": "dcterms:description",
                "class": "AD-Pln-Text",
                "value": "<div><p> This software module discriminates the user's activity (operation sequence) and submits corresponding events/commands to the actuator. This software is generic with respect to the actuator, it can be used for dimmers, shading devices and others. </p><p class=\"inline-label\"> Model View: </p><div class=\"forImage\" style=\"max-width: 600px;\"> <object data=\"files_and_images/45a1c8930000c3a801414cd1eaa70b5a.svg\" type=\"image/svg+xml\" >files_and_images\\45a1c8930000c3a801414cd1eaa70b5a.svg</object></div></div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Pln-Type",
                "value": "BPMN Process Model"
            }, {
                "title": "Status",
                "class": "AD-Pln-custom.status",
                "value": "V-Pln-custom.status-3"
            }, {
                "title": "Supplier Status",
                "class": "AD-Pln-custom.supplier-status",
                "value": "V-Pln-custom.supplier-status-2"
            }, {
                "title": "Supplier Comment",
                "class": "AD-Pln-custom.supplier-comment",
                "value": ""
            }, {
                "title": "OEM Status",
                "class": "AD-Pln-custom.oem-status",
                "value": "V-Pln-custom.oem-status-2"
            }, {
                "title": "OEM Comment",
                "class": "AD-Pln-custom.oem-comment",
                "value": ""
            }],
            "revision": 50,
            "changedAt": "2016-12-06T13:56:14+01:00",
            "changedBy": "od",
            "class": "OT-Pln"
        }, {
            "id": "Pln-5af364560000bca80137b84017f4e832",
            "title": "Dimmer Controller Software",
            "properties": [{
                "title": "dcterms:title",
                "class": "AD-Pln-Name",
                "value": "Dimmer Controller Software"
            }, {
                "title": "dcterms:description",
                "class": "AD-Pln-Text",
                "value": "<div><p> This software decodes the commands and controls the timely behavior of the actuator. </p><p class=\"inline-label\"> Model View: </p><div class=\"forImage\" style=\"max-width: 600px;\" > <object data=\"files_and_images/5af364560000bca80137b84017f4e832.svg\" type=\"image/svg+xml\" >files_and_images\\5af364560000bca80137b84017f4e832.svg</object></div></div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Pln-Type",
                "value": "Petri Net"
            }, {
                "title": "Status",
                "class": "AD-Pln-custom.status",
                "value": "V-Pln-custom.status-3"
            }, {
                "title": "Supplier Status",
                "class": "AD-Pln-custom.supplier-status",
                "value": "V-Pln-custom.supplier-status-2"
            }, {
                "title": "Supplier Comment",
                "class": "AD-Pln-custom.supplier-comment",
                "value": ""
            }, {
                "title": "OEM Status",
                "class": "AD-Pln-custom.oem-status",
                "value": "V-Pln-custom.oem-status-2"
            }, {
                "title": "OEM Comment",
                "class": "AD-Pln-custom.oem-comment",
                "value": ""
            }],
            "revision": 51,
            "changedAt": "2016-12-06T13:56:31+01:00",
            "changedBy": "od",
            "class": "OT-Pln"
        }, {
            "id": "Fld-5b8e98550000bca801371afb0c7b671b",
            "title": "Requirements",
            "properties": [{
                "title": "SpecIF:Heading",
                "class": "AD-Fld-Name",
                "value": "Requirements"
            }, {
                "title": "dcterms:description",
                "class": "AD-Fld-Text",
                "value": "<div/>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Fld-Type",
                "value": "Folder"
            }],
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "OT-Fld"
        }, {
            "id": "Fld-d1b1698a0000c3a801505b1b5698b7a1",
            "title": "Function",
            "properties": [{
                "title": "SpecIF:Heading",
                "class": "AD-Fld-Name",
                "value": "Function"
            }, {
                "title": "dcterms:description",
                "class": "AD-Fld-Text",
                "value": "<div><p>The requirements related to the product function.</p> </div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Fld-Type",
                "value": "Folder"
            }],
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "OT-Fld"
        }, {
            "id": "Req-d1c895230000c3a80150f8afd049f738",
            "title": "Dim an electric load",
            "properties": [{
                "title": "dcterms:identifier",
                "class": "AD-Req-ID",
                "value": "REQ_014"
            }, {
                "title": "dcterms:title",
                "class": "AD-Req-Name",
                "value": "Dim an electric load"
            }, {
                "title": "dcterms:description",
                "class": "AD-Req-Text",
                "value": "<div><p> The user can set the intensity level of an electric load such as a light bulb. Pressing a button 'up' or 'down', the intensity is increased or decreased following a quasi-stepless ramp. Another sentence.<br /></p></div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Req-Type",
                "value": "Requirement"
            }, {
                "title": "SpecIF:State",
                "class": "AD-Req-Status",
                "value": "V-Req-Status-5"
            }, {
                "title": "SpecIF:Priority",
                "class": "AD-Req-Priority",
                "value": "V-Req-Prio-1"
            }, {
                "title": "Perspective",
                "class": "AD-Req-custom.perspective",
                "value": "V-Req-custom.perspective-1"
            }, {
                "title": "Discipline",
                "class": "AD-Req-custom.discipline",
                "value": "V-Req-custom.discipline-0,V-Req-custom.discipline-1,V-Req-custom.discipline-2"
            }, {
                "title": "Supplier Status",
                "class": "AD-Req-custom.supplier-status",
                "value": "V-Req-custom.supplier-status-2"
            }, {
                "title": "Supplier Comment",
                "class": "AD-Req-custom.supplier-comment",
                "value": "Our solution does this perfectly."
            }, {
                "title": "OEM Status",
                "class": "AD-Req-custom.oem-status",
                "value": ""
            }, {
                "title": "OEM Comment",
                "class": "AD-Req-custom.oem-comment",
                "value": ""
            }],
            "revision": 76,
            "changedAt": "2017-04-12T17:42:25+02:00",
            "changedBy": "od",
            "class": "OT-Req"
        }, {
            "id": "Req-d1d42a6a0000c3a8015091ec8d149b93",
            "title": "Switch an electric load",
            "properties": [{
                "title": "dcterms:identifier",
                "class": "AD-Req-ID",
                "value": "REQ_016"
            }, {
                "title": "dcterms:title",
                "class": "AD-Req-Name",
                "value": "Switch an electric load"
            }, {
                "title": "dcterms:description",
                "class": "AD-Req-Text",
                "value": "<div><p>The user can immediately switch 'on' or 'off' the electric load. The intensity set to the maximum resp. minimum level, as defined by installation parameters.</p> </div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Req-Type",
                "value": "Requirement"
            }, {
                "title": "SpecIF:State",
                "class": "AD-Req-Status",
                "value": "V-Req-Status-4"
            }, {
                "title": "SpecIF:Priority",
                "class": "AD-Req-Priority",
                "value": "V-Req-Prio-1"
            }, {
                "title": "Perspective",
                "class": "AD-Req-custom.perspective",
                "value": "V-Req-custom.perspective-1"
            }, {
                "title": "Discipline",
                "class": "AD-Req-custom.discipline",
                "value": "V-Req-custom.discipline-0,V-Req-custom.discipline-1,V-Req-custom.discipline-2"
            }, {
                "title": "Supplier Status",
                "class": "AD-Req-custom.supplier-status",
                "value": ""
            }, {
                "title": "Supplier Comment",
                "class": "AD-Req-custom.supplier-comment",
                "value": ""
            }, {
                "title": "OEM Status",
                "class": "AD-Req-custom.oem-status",
                "value": ""
            }, {
                "title": "OEM Comment",
                "class": "AD-Req-custom.oem-comment",
                "value": ""
            }],
            "revision": 1,
            "changedAt": "2015-11-15T00:03:00+01:00",
            "class": "OT-Req"
        }, {
            "id": "Req-d1cd7f370000c3a8015095e6ee21aab7",
            "title": "Set dimming parameters",
            "properties": [{
                "title": "dcterms:identifier",
                "class": "AD-Req-ID",
                "value": "REQ_015"
            }, {
                "title": "dcterms:title",
                "class": "AD-Req-Name",
                "value": "Set dimming parameters"
            }, {
                "title": "dcterms:description",
                "class": "AD-Req-Text",
                "value": "<div><p> During system setup, the installer can modify the following parameters: </p><ul> <li> maximum intensity </li> <li> minimum intensity </li> <li> dimming speed (intensity ramp when dimming) </li></ul></div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Req-Type",
                "value": "Requirement"
            }, {
                "title": "SpecIF:State",
                "class": "AD-Req-Status",
                "value": "V-Req-Status-4"
            }, {
                "title": "SpecIF:Priority",
                "class": "AD-Req-Priority",
                "value": "V-Req-Prio-1"
            }, {
                "title": "Perspective",
                "class": "AD-Req-custom.perspective",
                "value": "V-Req-custom.perspective-1"
            }, {
                "title": "Discipline",
                "class": "AD-Req-custom.discipline",
                "value": "V-Req-custom.discipline-2"
            }, {
                "title": "Supplier Status",
                "class": "AD-Req-custom.supplier-status",
                "value": ""
            }, {
                "title": "Supplier Comment",
                "class": "AD-Req-custom.supplier-comment",
                "value": ""
            }, {
                "title": "OEM Status",
                "class": "AD-Req-custom.oem-status",
                "value": ""
            }, {
                "title": "OEM Comment",
                "class": "AD-Req-custom.oem-comment",
                "value": ""
            }],
            "revision": 74,
            "changedAt": "2017-02-09T09:06:43+01:00",
            "changedBy": "od",
            "class": "OT-Req"
        }, {
            "id": "Req-5ba3512b0000bca801371cc0617eb4c1",
            "title": "Minimum button size",
            "properties": [{
                "title": "dcterms:identifier",
                "class": "AD-Req-ID",
                "value": "REQ_009"
            }, {
                "title": "dcterms:title",
                "class": "AD-Req-Name",
                "value": "Minimum button size"
            }, {
                "title": "dcterms:description",
                "class": "AD-Req-Text",
                "value": "<div><p>The button size must not be less than 2 cm in diameter.</p> </div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Req-Type",
                "value": "Requirement"
            }, {
                "title": "SpecIF:State",
                "class": "AD-Req-Status",
                "value": "V-Req-Status-5"
            }, {
                "title": "SpecIF:Priority",
                "class": "AD-Req-Priority",
                "value": "V-Req-Prio-0"
            }, {
                "title": "Perspective",
                "class": "AD-Req-custom.perspective",
                "value": "V-Req-custom.perspective-1"
            }, {
                "title": "Discipline",
                "class": "AD-Req-custom.discipline",
                "value": "V-Req-custom.discipline-0"
            }, {
                "title": "Supplier Status",
                "class": "AD-Req-custom.supplier-status",
                "value": ""
            }, {
                "title": "Supplier Comment",
                "class": "AD-Req-custom.supplier-comment",
                "value": ""
            }, {
                "title": "OEM Status",
                "class": "AD-Req-custom.oem-status",
                "value": ""
            }, {
                "title": "OEM Comment",
                "class": "AD-Req-custom.oem-comment",
                "value": ""
            }],
            "revision": 1,
            "changedAt": "2015-11-04T10:08:00+01:00",
            "class": "OT-Req"
        }, {
            "id": "Req-5b8fbb300000bca80137c73e3ce4c737",
            "title": "Electric load is 120 W",
            "properties": [{
                "title": "dcterms:identifier",
                "class": "AD-Req-ID",
                "value": "REQ_001"
            }, {
                "title": "dcterms:title",
                "class": "AD-Req-Name",
                "value": "Electric load is 120 W"
            }, {
                "title": "dcterms:description",
                "class": "AD-Req-Text",
                "value": "<div><p>The power stage must allow an electric load of 120 W.</p> </div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Req-Type",
                "value": "Requirement"
            }, {
                "title": "SpecIF:State",
                "class": "AD-Req-Status",
                "value": "V-Req-Status-4"
            }, {
                "title": "SpecIF:Priority",
                "class": "AD-Req-Priority",
                "value": "V-Req-Prio-0"
            }, {
                "title": "Perspective",
                "class": "AD-Req-custom.perspective",
                "value": "V-Req-custom.perspective-1"
            }, {
                "title": "Discipline",
                "class": "AD-Req-custom.discipline",
                "value": "V-Req-custom.discipline-1"
            }, {
                "title": "Supplier Status",
                "class": "AD-Req-custom.supplier-status",
                "value": ""
            }, {
                "title": "Supplier Comment",
                "class": "AD-Req-custom.supplier-comment",
                "value": ""
            }, {
                "title": "OEM Status",
                "class": "AD-Req-custom.oem-status",
                "value": ""
            }, {
                "title": "OEM Comment",
                "class": "AD-Req-custom.oem-comment",
                "value": ""
            }],
            "revision": 1,
            "changedAt": "2015-11-04T10:32:00+01:00",
            "class": "OT-Req"
        }, {
            "id": "Fld-d1b1d6c60000c3a80150fe9ce40e6588",
            "title": "Quality",
            "properties": [{
                "title": "SpecIF:Heading",
                "class": "AD-Fld-Name",
                "value": "Quality"
            }, {
                "title": "dcterms:description",
                "class": "AD-Fld-Text",
                "value": "<div><p>The requirements related to quality characteristics of the product.</p> </div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Fld-Type",
                "value": "Folder"
            }],
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "OT-Fld"
        }, {
            "id": "Req-5b944fc70000bca8013763f44fdc0e03",
            "title": "Instant use",
            "properties": [{
                "title": "dcterms:identifier",
                "class": "AD-Req-ID",
                "value": "REQ_003"
            }, {
                "title": "dcterms:title",
                "class": "AD-Req-Name",
                "value": "Instant use"
            }, {
                "title": "dcterms:description",
                "class": "AD-Req-Text",
                "value": "<div><p>85% of an arbitrarily selected group of test users understands and can use the system without reading a manual.</p> </div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Req-Type",
                "value": "Requirement"
            }, {
                "title": "SpecIF:State",
                "class": "AD-Req-Status",
                "value": "V-Req-Status-5"
            }, {
                "title": "SpecIF:Priority",
                "class": "AD-Req-Priority",
                "value": "V-Req-Prio-1"
            }, {
                "title": "Perspective",
                "class": "AD-Req-custom.perspective",
                "value": "V-Req-custom.perspective-1"
            }, {
                "title": "Discipline",
                "class": "AD-Req-custom.discipline",
                "value": "V-Req-custom.discipline-0,V-Req-custom.discipline-2"
            }, {
                "title": "Supplier Status",
                "class": "AD-Req-custom.supplier-status",
                "value": "V-Req-custom.supplier-status-2"
            }, {
                "title": "Supplier Comment",
                "class": "AD-Req-custom.supplier-comment",
                "value": ""
            }, {
                "title": "OEM Status",
                "class": "AD-Req-custom.oem-status",
                "value": ""
            }, {
                "title": "OEM Comment",
                "class": "AD-Req-custom.oem-comment",
                "value": ""
            }],
            "revision": 15,
            "changedAt": "2016-11-18T14:57:31+01:00",
            "changedBy": "DuO",
            "class": "OT-Req"
        }, {
            "id": "Req-5ba140d60000bca801372b09f9888eca",
            "title": "Instantaneous reaction",
            "properties": [{
                "title": "dcterms:identifier",
                "class": "AD-Req-ID",
                "value": "REQ_008"
            }, {
                "title": "dcterms:title",
                "class": "AD-Req-Name",
                "value": "Instantaneous reaction"
            }, {
                "title": "dcterms:description",
                "class": "AD-Req-Text",
                "value": "<div><p> The reaction time of the system to user input is 'instantaneous' (&lt; 0,5 sec).</p></div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Req-Type",
                "value": "Requirement"
            }, {
                "title": "SpecIF:State",
                "class": "AD-Req-Status",
                "value": "V-Req-Status-6"
            }, {
                "title": "SpecIF:Priority",
                "class": "AD-Req-Priority",
                "value": "V-Req-Prio-0"
            }, {
                "title": "Perspective",
                "class": "AD-Req-custom.perspective",
                "value": "V-Req-custom.perspective-1"
            }, {
                "title": "Discipline",
                "class": "AD-Req-custom.discipline",
                "value": "V-Req-custom.discipline-2"
            }, {
                "title": "Supplier Status",
                "class": "AD-Req-custom.supplier-status",
                "value": ""
            }, {
                "title": "Supplier Comment",
                "class": "AD-Req-custom.supplier-comment",
                "value": ""
            }, {
                "title": "OEM Status",
                "class": "AD-Req-custom.oem-status",
                "value": ""
            }, {
                "title": "OEM Comment",
                "class": "AD-Req-custom.oem-comment",
                "value": ""
            }],
            "revision": 66,
            "changedAt": "2017-01-04T23:19:18+01:00",
            "changedBy": "od",
            "class": "OT-Req"
        }, {
            "id": "Req-ee452cf20000c3a8014035290669304d",
            "title": "Consistent system behavior",
            "properties": [{
                "title": "dcterms:identifier",
                "class": "AD-Req-ID",
                "value": "REQ_011"
            }, {
                "title": "dcterms:title",
                "class": "AD-Req-Name",
                "value": "Consistent system behavior"
            }, {
                "title": "dcterms:description",
                "class": "AD-Req-Text",
                "value": "<div><p>The system's behavior must be consistent. For example, controlling a dimmer must correspond with controlling a shade.</p> </div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Req-Type",
                "value": "Requirement"
            }, {
                "title": "SpecIF:State",
                "class": "AD-Req-Status",
                "value": "V-Req-Status-5"
            }, {
                "title": "SpecIF:Priority",
                "class": "AD-Req-Priority",
                "value": "V-Req-Prio-1"
            }, {
                "title": "Perspective",
                "class": "AD-Req-custom.perspective",
                "value": "V-Req-custom.perspective-1"
            }, {
                "title": "Discipline",
                "class": "AD-Req-custom.discipline",
                "value": "V-Req-custom.discipline-0,V-Req-custom.discipline-2"
            }, {
                "title": "Supplier Status",
                "class": "AD-Req-custom.supplier-status",
                "value": ""
            }, {
                "title": "Supplier Comment",
                "class": "AD-Req-custom.supplier-comment",
                "value": ""
            }, {
                "title": "OEM Status",
                "class": "AD-Req-custom.oem-status",
                "value": ""
            }, {
                "title": "OEM Comment",
                "class": "AD-Req-custom.oem-comment",
                "value": ""
            }],
            "revision": 1,
            "changedAt": "2015-11-04T10:07:00+01:00",
            "class": "OT-Req"
        }, {
            "id": "Req-ee43fc4c0000c3a8014063d42c77767f",
            "title": "No dead-locks",
            "properties": [{
                "title": "dcterms:identifier",
                "class": "AD-Req-ID",
                "value": "REQ_010"
            }, {
                "title": "dcterms:title",
                "class": "AD-Req-Name",
                "value": "No dead-locks"
            }, {
                "title": "dcterms:description",
                "class": "AD-Req-Text",
                "value": "<div><p>Under no circumstances the system may get stuck in a dead-lock. I.e. every sequence of input stimulation must be supported, even arbitrary sequences. Input stimulation which is not supported in a given system state is either refused with an error message, if a feedback channel is available, or it is simply ignored, otherwise.</p> </div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Req-Type",
                "value": "Requirement"
            }, {
                "title": "SpecIF:State",
                "class": "AD-Req-Status",
                "value": "V-Req-Status-5"
            }, {
                "title": "SpecIF:Priority",
                "class": "AD-Req-Priority",
                "value": "V-Req-Prio-0"
            }, {
                "title": "Perspective",
                "class": "AD-Req-custom.perspective",
                "value": "V-Req-custom.perspective-2"
            }, {
                "title": "Discipline",
                "class": "AD-Req-custom.discipline",
                "value": "V-Req-custom.discipline-1,V-Req-custom.discipline-2"
            }, {
                "title": "Supplier Status",
                "class": "AD-Req-custom.supplier-status",
                "value": ""
            }, {
                "title": "Supplier Comment",
                "class": "AD-Req-custom.supplier-comment",
                "value": ""
            }, {
                "title": "OEM Status",
                "class": "AD-Req-custom.oem-status",
                "value": ""
            }, {
                "title": "OEM Comment",
                "class": "AD-Req-custom.oem-comment",
                "value": ""
            }],
            "revision": 1,
            "changedAt": "2015-11-04T10:08:00+01:00",
            "class": "OT-Req"
        }, {
            "id": "Req-5b9124bc0000bca80137fa2ce86f5eca",
            "title": "Overload protection",
            "properties": [{
                "title": "dcterms:identifier",
                "class": "AD-Req-ID",
                "value": "REQ_002"
            }, {
                "title": "dcterms:title",
                "class": "AD-Req-Name",
                "value": "Overload protection"
            }, {
                "title": "dcterms:description",
                "class": "AD-Req-Text",
                "value": "<div><p>The dimmer unit is protected against resistive overload and against any capacitive or inductive loads.</p> </div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Req-Type",
                "value": "Requirement"
            }, {
                "title": "SpecIF:State",
                "class": "AD-Req-Status",
                "value": "V-Req-Status-4"
            }, {
                "title": "SpecIF:Priority",
                "class": "AD-Req-Priority",
                "value": "V-Req-Prio-1"
            }, {
                "title": "Perspective",
                "class": "AD-Req-custom.perspective",
                "value": "V-Req-custom.perspective-1"
            }, {
                "title": "Discipline",
                "class": "AD-Req-custom.discipline",
                "value": "V-Req-custom.discipline-1"
            }, {
                "title": "Supplier Status",
                "class": "AD-Req-custom.supplier-status",
                "value": ""
            }, {
                "title": "Supplier Comment",
                "class": "AD-Req-custom.supplier-comment",
                "value": ""
            }, {
                "title": "OEM Status",
                "class": "AD-Req-custom.oem-status",
                "value": ""
            }, {
                "title": "OEM Comment",
                "class": "AD-Req-custom.oem-comment",
                "value": ""
            }],
            "revision": 1,
            "changedAt": "2015-11-04T10:05:00+01:00",
            "class": "OT-Req"
        }, {
            "id": "Req-5b9e68530000bca801371362c49d2d08",
            "title": "Auto shut-off",
            "properties": [{
                "title": "dcterms:identifier",
                "class": "AD-Req-ID",
                "value": "REQ_007"
            }, {
                "title": "dcterms:title",
                "class": "AD-Req-Name",
                "value": "Auto shut-off"
            }, {
                "title": "dcterms:description",
                "class": "AD-Req-Text",
                "value": "<div><p>In case of over-temperature the device is shut-off automatically by an electronic circuit.</p> </div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Req-Type",
                "value": "Requirement"
            }, {
                "title": "SpecIF:State",
                "class": "AD-Req-Status",
                "value": "V-Req-Status-4"
            }, {
                "title": "SpecIF:Priority",
                "class": "AD-Req-Priority",
                "value": "V-Req-Prio-1"
            }, {
                "title": "Perspective",
                "class": "AD-Req-custom.perspective",
                "value": "V-Req-custom.perspective-2"
            }, {
                "title": "Discipline",
                "class": "AD-Req-custom.discipline",
                "value": "V-Req-custom.discipline-1"
            }, {
                "title": "Supplier Status",
                "class": "AD-Req-custom.supplier-status",
                "value": ""
            }, {
                "title": "Supplier Comment",
                "class": "AD-Req-custom.supplier-comment",
                "value": ""
            }, {
                "title": "OEM Status",
                "class": "AD-Req-custom.oem-status",
                "value": ""
            }, {
                "title": "OEM Comment",
                "class": "AD-Req-custom.oem-comment",
                "value": ""
            }],
            "revision": 1,
            "changedAt": "2015-11-04T10:05:00+01:00",
            "class": "OT-Req"
        }, {
            "id": "Fld-d1b314890000c3a80150b71a1473d374",
            "title": "Constraints",
            "properties": [{
                "title": "SpecIF:Heading",
                "class": "AD-Fld-Name",
                "value": "Constraints"
            }, {
                "title": "dcterms:description",
                "class": "AD-Fld-Text",
                "value": "<div><p>The requirements related to constraints for product conception, such as regulations or technical choices made upfront.</p> </div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Fld-Type",
                "value": "Folder"
            }],
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "OT-Fld"
        }, {
            "id": "Req-eea1cd500000c3a80140fe00109eb7f4",
            "title": "Compliance with industry standards",
            "properties": [{
                "title": "dcterms:identifier",
                "class": "AD-Req-ID",
                "value": "REQ_012"
            }, {
                "title": "dcterms:title",
                "class": "AD-Req-Name",
                "value": "Compliance with industry standards"
            }, {
                "title": "dcterms:description",
                "class": "AD-Req-Text",
                "value": "<div><p>The system must comply with industry standards. Besides legal and safety requirements, compatibility with existing electrical installations, tools and commercial components is desired.</p> </div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Req-Type",
                "value": "Requirement"
            }, {
                "title": "SpecIF:State",
                "class": "AD-Req-Status",
                "value": "V-Req-Status-5"
            }, {
                "title": "SpecIF:Priority",
                "class": "AD-Req-Priority",
                "value": "V-Req-Prio-1"
            }, {
                "title": "Perspective",
                "class": "AD-Req-custom.perspective",
                "value": "V-Req-custom.perspective-1"
            }, {
                "title": "Discipline",
                "class": "AD-Req-custom.discipline",
                "value": "V-Req-custom.discipline-0,V-Req-custom.discipline-1,V-Req-custom.discipline-3"
            }, {
                "title": "Supplier Status",
                "class": "AD-Req-custom.supplier-status",
                "value": ""
            }, {
                "title": "Supplier Comment",
                "class": "AD-Req-custom.supplier-comment",
                "value": ""
            }, {
                "title": "OEM Status",
                "class": "AD-Req-custom.oem-status",
                "value": ""
            }, {
                "title": "OEM Comment",
                "class": "AD-Req-custom.oem-comment",
                "value": ""
            }],
            "revision": 1,
            "changedAt": "2015-11-04T10:07:00+01:00",
            "class": "OT-Req"
        }, {
            "id": "Req-5b95fae40000bca801372becc933682d",
            "title": "Industry-standard mounting",
            "properties": [{
                "title": "dcterms:identifier",
                "class": "AD-Req-ID",
                "value": "REQ_004"
            }, {
                "title": "dcterms:title",
                "class": "AD-Req-Name",
                "value": "Industry-standard mounting"
            }, {
                "title": "dcterms:description",
                "class": "AD-Req-Text",
                "value": "<div><p>The product fits into an industry-standard housing for flush-mounted devices (diameter Ø 68 mm). It is fixed with two screw-activated claws.</p> </div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Req-Type",
                "value": "Requirement"
            }, {
                "title": "SpecIF:State",
                "class": "AD-Req-Status",
                "value": "V-Req-Status-4"
            }, {
                "title": "SpecIF:Priority",
                "class": "AD-Req-Priority",
                "value": "V-Req-Prio-0"
            }, {
                "title": "Perspective",
                "class": "AD-Req-custom.perspective",
                "value": "V-Req-custom.perspective-2"
            }, {
                "title": "Discipline",
                "class": "AD-Req-custom.discipline",
                "value": "V-Req-custom.discipline-0"
            }, {
                "title": "Supplier Status",
                "class": "AD-Req-custom.supplier-status",
                "value": ""
            }, {
                "title": "Supplier Comment",
                "class": "AD-Req-custom.supplier-comment",
                "value": ""
            }, {
                "title": "OEM Status",
                "class": "AD-Req-custom.oem-status",
                "value": ""
            }, {
                "title": "OEM Comment",
                "class": "AD-Req-custom.oem-comment",
                "value": ""
            }],
            "revision": 1,
            "changedAt": "2015-11-04T10:04:00+01:00",
            "class": "OT-Req"
        }, {
            "id": "Req-5b9ab8a50000bca801377ad0be3bbc89",
            "title": "Fire protection",
            "properties": [{
                "title": "dcterms:identifier",
                "class": "AD-Req-ID",
                "value": "REQ_005"
            }, {
                "title": "dcterms:title",
                "class": "AD-Req-Name",
                "value": "Fire protection"
            }, {
                "title": "dcterms:description",
                "class": "AD-Req-Text",
                "value": "<div><p>The product must withstand 650°C (VDE 0606-1).</p> </div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Req-Type",
                "value": "Requirement"
            }, {
                "title": "SpecIF:State",
                "class": "AD-Req-Status",
                "value": "V-Req-Status-4"
            }, {
                "title": "SpecIF:Priority",
                "class": "AD-Req-Priority",
                "value": "V-Req-Prio-0"
            }, {
                "title": "Perspective",
                "class": "AD-Req-custom.perspective",
                "value": "V-Req-custom.perspective-1"
            }, {
                "title": "Discipline",
                "class": "AD-Req-custom.discipline",
                "value": "V-Req-custom.discipline-0"
            }, {
                "title": "Supplier Status",
                "class": "AD-Req-custom.supplier-status",
                "value": ""
            }, {
                "title": "Supplier Comment",
                "class": "AD-Req-custom.supplier-comment",
                "value": ""
            }, {
                "title": "OEM Status",
                "class": "AD-Req-custom.oem-status",
                "value": ""
            }, {
                "title": "OEM Comment",
                "class": "AD-Req-custom.oem-comment",
                "value": ""
            }],
            "revision": 1,
            "changedAt": "2015-11-04T10:04:00+01:00",
            "class": "OT-Req"
        }, {
            "id": "Req-728c69c80018b1a8014b974542c36edc",
            "title": "Galvanic Isolation",
            "properties": [{
                "title": "dcterms:identifier",
                "class": "AD-Req-ID",
                "value": "REQ_013"
            }, {
                "title": "dcterms:title",
                "class": "AD-Req-Name",
                "value": "Galvanic Isolation"
            }, {
                "title": "dcterms:description",
                "class": "AD-Req-Text",
                "value": "<div><p>The load circuit with power stage is galvanically isolated from the controller.</p> </div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Req-Type",
                "value": "Requirement"
            }, {
                "title": "SpecIF:State",
                "class": "AD-Req-Status",
                "value": "V-Req-Status-4"
            }, {
                "title": "SpecIF:Priority",
                "class": "AD-Req-Priority",
                "value": "V-Req-Prio-0"
            }, {
                "title": "Perspective",
                "class": "AD-Req-custom.perspective",
                "value": "V-Req-custom.perspective-2"
            }, {
                "title": "Discipline",
                "class": "AD-Req-custom.discipline",
                "value": "V-Req-custom.discipline-1"
            }, {
                "title": "Supplier Status",
                "class": "AD-Req-custom.supplier-status",
                "value": ""
            }, {
                "title": "Supplier Comment",
                "class": "AD-Req-custom.supplier-comment",
                "value": ""
            }, {
                "title": "OEM Status",
                "class": "AD-Req-custom.oem-status",
                "value": ""
            }, {
                "title": "OEM Comment",
                "class": "AD-Req-custom.oem-comment",
                "value": ""
            }],
            "revision": 1,
            "changedAt": "2015-11-04T10:06:00+01:00",
            "class": "OT-Req"
        }, {
            "id": "Req-5b9c950e0000bca801374f16615247b9",
            "title": "Complete state-machine",
            "properties": [{
                "title": "dcterms:identifier",
                "class": "AD-Req-ID",
                "value": "REQ_006"
            }, {
                "title": "dcterms:title",
                "class": "AD-Req-Name",
                "value": "Complete state-machine"
            }, {
                "title": "dcterms:description",
                "class": "AD-Req-Text",
                "value": "<div><p>The system is controlled by a complete state-machine and must not have any dead-lock state.</p> </div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Req-Type",
                "value": "Requirement"
            }, {
                "title": "SpecIF:State",
                "class": "AD-Req-Status",
                "value": "V-Req-Status-4"
            }, {
                "title": "SpecIF:Priority",
                "class": "AD-Req-Priority",
                "value": "V-Req-Prio-1"
            }, {
                "title": "Perspective",
                "class": "AD-Req-custom.perspective",
                "value": "V-Req-custom.perspective-2"
            }, {
                "title": "Discipline",
                "class": "AD-Req-custom.discipline",
                "value": "V-Req-custom.discipline-2"
            }, {
                "title": "Supplier Status",
                "class": "AD-Req-custom.supplier-status",
                "value": ""
            }, {
                "title": "Supplier Comment",
                "class": "AD-Req-custom.supplier-comment",
                "value": ""
            }, {
                "title": "OEM Status",
                "class": "AD-Req-custom.oem-status",
                "value": ""
            }, {
                "title": "OEM Comment",
                "class": "AD-Req-custom.oem-comment",
                "value": ""
            }],
            "revision": 1,
            "changedAt": "2015-11-04T10:06:00+01:00",
            "class": "OT-Req"
        }, {
            "id": "Fld-ef47e6970000c3a80139dc747c5df319",
            "title": "Open Issues",
            "properties": [{
                "title": "SpecIF:Heading",
                "class": "AD-Fld-Name",
                "value": "Open Issues"
            }, {
                "title": "dcterms:description",
                "class": "AD-Fld-Text",
                "value": "<div/>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Fld-Type",
                "value": "Folder"
            }],
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "OT-Fld"
        }, {
            "id": "Fld-ee29463e0000c3a80139627bbced50ae",
            "title": "Mechanical",
            "properties": [{
                "title": "SpecIF:Heading",
                "class": "AD-Fld-Name",
                "value": "Mechanical"
            }, {
                "title": "dcterms:description",
                "class": "AD-Fld-Text",
                "value": "<div/>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Fld-Type",
                "value": "Folder"
            }],
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "OT-Fld"
        }, {
            "id": "Iss-ee2abb630000c3a8013987a750219659",
            "title": "An open issue with respect to mechanics",
            "properties": [{
                "title": "dcterms:identifier",
                "class": "AD-Iss-ObjectID",
                "value": "OPM_001"
            }, {
                "title": "dcterms:title",
                "class": "AD-Iss-Name",
                "value": "An open issue with respect to mechanics"
            }, {
                "title": "dcterms:description",
                "class": "AD-Iss-Text",
                "value": "<div><p>This is the description of the issue and potential solution.</p> </div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Iss-Type",
                "value": "Open Issue"
            }, {
                "title": "SpecIF:State",
                "class": "AD-Iss-Status",
                "value": "V-Iss-Status-3"
            }, {
                "title": "SpecIF:Priority",
                "class": "AD-Iss-Priority",
                "value": "V-Iss-Prio-2"
            }, {
                "title": "SpecIF:Responsible",
                "class": "AD-Iss-Responsible",
                "value": ""
            }, {
                "title": "SpecIF:DueDate",
                "class": "AD-Iss-DueDate",
                "value": "2012-09-30T12:00:00+02:00"
            }],
            "revision": 1,
            "changedAt": "2013-04-21T19:09:00+02:00",
            "class": "OT-Iss"
        }, {
            "id": "Fld-ee2a15040000c3a80139d27de6704f15",
            "title": "Software",
            "properties": [{
                "title": "SpecIF:Heading",
                "class": "AD-Fld-Name",
                "value": "Software"
            }, {
                "title": "dcterms:description",
                "class": "AD-Fld-Text",
                "value": "<div/>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Fld-Type",
                "value": "Folder"
            }],
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "OT-Fld"
        }, {
            "id": "Iss-eee2d4e00000c3a801394148dcc58a52",
            "title": "An open issue concerning software",
            "properties": [{
                "title": "dcterms:identifier",
                "class": "AD-Iss-ObjectID",
                "value": "OPS_001"
            }, {
                "title": "dcterms:title",
                "class": "AD-Iss-Name",
                "value": "An open issue concerning software"
            }, {
                "title": "dcterms:description",
                "class": "AD-Iss-Text",
                "value": "<div><p>A description.</p> </div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Iss-Type",
                "value": "Open Issue"
            }, {
                "title": "SpecIF:State",
                "class": "AD-Iss-Status",
                "value": "V-Iss-Status-6"
            }, {
                "title": "SpecIF:Priority",
                "class": "AD-Iss-Priority",
                "value": "V-Iss-Prio-3"
            }, {
                "title": "SpecIF:Responsible",
                "class": "AD-Iss-Responsible",
                "value": "Vorname Nachname"
            }, {
                "title": "SpecIF:DueDate",
                "class": "AD-Iss-DueDate",
                "value": "2012-09-30T12:00:00+02:00"
            }],
            "revision": 1,
            "changedAt": "2013-04-21T19:01:00+02:00",
            "class": "OT-Iss"
        }, {
            "id": "Fld-59c8a7730000bca80137509a49b1218b-glossary",
            "title": "Model-Elements (Glossary)",
            "properties": [{
                "title": "SpecIF:Heading",
                "class": "AD-Fld-Name",
                "value": "Model-Elements (Glossary)"
            }, {
                "title": "dcterms:description",
                "class": "AD-Fld-Text",
                "value": "<div/>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Fld-Type",
                "value": "Folder"
            }],
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "OT-Fld"
        }, {
            "id": "Fld-59c8a7730000bca80137509a49b1218b-Act",
            "title": "Type 'Actor'",
            "properties": [{
                "title": "SpecIF:Heading",
                "class": "AD-Fld-Name",
                "value": "Type 'Actor'"
            }, {
                "title": "dcterms:description",
                "class": "AD-Fld-Text",
                "value": "<div><p>An 'Actor' is a fundamental model element type representing an active entity, be it an activity, a process step, a function, a system component or a role.</p></div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Fld-Type",
                "value": "Folder"
            }],
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "OT-Fld"
        }, {
            "id": "MEl-5a76365c0000bca8013776e91afd1e8e",
            "title": "Assembly Frame",
            "properties": [{
                "title": "dcterms:title",
                "class": "AD-Act-Name",
                "value": "Assembly Frame"
            }, {
                "title": "dcterms:description",
                "class": "AD-Act-Text",
                "value": "<div><p>Frame screwed to a wall.</p> </div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Act-Type",
                "value": "Actor (Role, Function)"
            }],
            "revision": 1,
            "changedAt": "2012-05-17T17:17:00+02:00",
            "class": "OT-Act"
        }, {
            "id": "MEl-608177820000bca801379179ebf3b6aa",
            "title": "Briefly press Down-button",
            "properties": [{
                "title": "dcterms:title",
                "class": "AD-Act-Name",
                "value": "Briefly press Down-button"
            }, {
                "title": "dcterms:description",
                "class": "AD-Act-Text",
                "value": "<div><p>Press down-button &lt;x ms.</p> </div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Act-Type",
                "value": "Actor (Role, Function)"
            }],
            "revision": 1,
            "changedAt": "2013-09-22T14:11:00+02:00",
            "class": "OT-Act"
        }, {
            "id": "MEl-611366530000bca80137a97f194e96a3",
            "title": "Briefly press Up-button",
            "properties": [{
                "title": "dcterms:title",
                "class": "AD-Act-Name",
                "value": "Briefly press Up-button"
            }, {
                "title": "dcterms:description",
                "class": "AD-Act-Text",
                "value": "<div><p>Press up-button &lt;x ms.</p> </div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Act-Type",
                "value": "Actor (Role, Function)"
            }],
            "revision": 1,
            "changedAt": "2013-09-22T14:11:00+02:00",
            "class": "OT-Act"
        }, {
            "id": "MEl-5bd6bd890000bca8013739588a3f43d6",
            "title": "Bulb",
            "properties": [{
                "title": "dcterms:title",
                "class": "AD-Act-Name",
                "value": "Bulb"
            }, {
                "title": "dcterms:description",
                "class": "AD-Act-Text",
                "value": "<div><p>Dimmable light-bulb 230V.</p> </div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Act-Type",
                "value": "Actor (Role, Function)"
            }],
            "revision": 1,
            "changedAt": "2012-05-17T19:30:00+02:00",
            "class": "OT-Act"
        }, {
            "id": "MEl-5a85347c0000bca80137ad485c7cd330",
            "title": "Dimmer Controller Software",
            "properties": [{
                "title": "dcterms:title",
                "class": "AD-Act-Name",
                "value": "Dimmer Controller Software"
            }, {
                "title": "dcterms:description",
                "class": "AD-Act-Text",
                "value": "<div><p>Input commands (events):</p> <ul> <li>up-long --&gt; increase brightness</li> <li>down-long --&gt; decrease brightness</li> <li>release --&gt; stop dimming, keep brightness</li> <li>up-short --&gt; switch to maximum</li> <li>down-short --&gt; switch to minimum</li> <li>inappropriate commands are ignored (e.g. up-long when maximum is set).</li> <li>set parameters</li> </ul><p/> <p>Four parameters influence the behavior of the particular device:</p> <ul> <li>minimum value (default: 0%)</li> <li>maximum value (default: 100%)</li> <li>ramp-up speed (default: 10% per sec)</li> <li>ramp-down speed (default: 10% per sec)</li></ul> </div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Act-Type",
                "value": "Actor (Role, Function)"
            }],
            "revision": 1,
            "changedAt": "2014-06-26T15:17:00+02:00",
            "class": "OT-Act"
        }, {
            "id": "MEl-5a808e2a0000bca80137bfd74268a84a",
            "title": "Dimmer Electronics",
            "properties": [{
                "title": "dcterms:title",
                "class": "AD-Act-Name",
                "value": "Dimmer Electronics"
            }, {
                "title": "dcterms:description",
                "class": "AD-Act-Text",
                "value": "<div><p>The Dimmer Electronics is a printed circuit board with low-power micro-processor, memory, binary as well as analog I/O signals and a power stage supporting the specified electric load.</p> <p class=\"inline-label\">Diagramm</p><p><object data=\"files_and_images\\Schaltplan.gif\" name=\"Schaltplan.gif\" type=\"image/gif\"/></p> </div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Act-Type",
                "value": "Actor (Role, Function)"
            }],
            "revision": 1,
            "changedAt": "2015-02-10T08:58:00+01:00",
            "class": "OT-Act"
        }, {
            "id": "MEl-5a752ccc0000bca80137479a2e8bab30",
            "title": "Dimmer Module",
            "properties": [{
                "title": "dcterms:title",
                "class": "AD-Act-Name",
                "value": "Dimmer Module"
            }, {
                "title": "dcterms:description",
                "class": "AD-Act-Text",
                "value": "<div><p>The actuator module with dimmer function for resistive loads.</p> </div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Act-Type",
                "value": "Actor (Role, Function)"
            }],
            "revision": 1,
            "changedAt": "2013-09-22T00:09:00+02:00",
            "class": "OT-Act"
        }, {
            "id": "MEl-5a71c4800000bca80137f2aaa7b63000",
            "title": "Double Button",
            "properties": [{
                "title": "dcterms:title",
                "class": "AD-Act-Name",
                "value": "Double Button"
            }, {
                "title": "dcterms:description",
                "class": "AD-Act-Text",
                "value": "<div><p>The Double Button (a sensor unit) is a versatile all-mechanical unit used for multiple purposes. The mechanical position is transferred with a rod per button to the next unit where it is converted to an electrical signal.</p> </div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Act-Type",
                "value": "Actor (Role, Function)"
            }],
            "revision": 1,
            "changedAt": "2013-09-22T00:10:00+02:00",
            "class": "OT-Act"
        }, {
            "id": "MEl-606f16ac0000bca801373587fda932b3",
            "title": "Double-Button Observer Software",
            "properties": [{
                "title": "dcterms:title",
                "class": "AD-Act-Name",
                "value": "Double-Button Observer Software"
            }, {
                "title": "dcterms:description",
                "class": "AD-Act-Text",
                "value": "<div><p>This is an observer of the double-button sensor. It distinguishes short and long pressing in the 'up' and 'down' directions. A discriminator may send five events:</p> <ul> <li>up-short</li> <li>down-short</li> <li>up-long</li> <li>down-long and </li> <li>release.</li> </ul><p>The events are interpreted and actions are initiated accordingly by the object actuator unit. The double button sensor and the observer have no notion of the underlying function.</p> </div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Act-Type",
                "value": "Actor (Role, Function)"
            }],
            "revision": 1,
            "changedAt": "2014-06-26T15:12:00+02:00",
            "class": "OT-Act"
        }, {
            "id": "MEl-5a8009a00000bca80137ef95bc3f643f",
            "title": "Housing",
            "properties": [{
                "title": "dcterms:title",
                "class": "AD-Act-Name",
                "value": "Housing"
            }, {
                "title": "dcterms:description",
                "class": "AD-Act-Text",
                "value": "<div> <p class=\"inline-label\">Diagramm</p><p><object data=\"files_and_images\\UP-Dose.png\" name=\"UP-Dose.png\" type=\"image/png\"/></p> </div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Act-Type",
                "value": "Actor (Role, Function)"
            }],
            "revision": 1,
            "changedAt": "2015-02-10T08:58:00+01:00",
            "class": "OT-Act"
        }, {
            "id": "MEl-608239830000bca801373690c7d2af0f",
            "title": "Press and hold Down-button",
            "properties": [{
                "title": "dcterms:title",
                "class": "AD-Act-Name",
                "value": "Press and hold Down-button"
            }, {
                "title": "dcterms:description",
                "class": "AD-Act-Text",
                "value": "<div><p>Press down-button &gt;x ms.</p> </div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Act-Type",
                "value": "Actor (Role, Function)"
            }],
            "revision": 1,
            "changedAt": "2013-09-22T14:11:00+02:00",
            "class": "OT-Act"
        }, {
            "id": "MEl-610b07100000bca80137c10f96c46247",
            "title": "Press and hold Up-button",
            "properties": [{
                "title": "dcterms:title",
                "class": "AD-Act-Name",
                "value": "Press and hold Up-button"
            }, {
                "title": "dcterms:description",
                "class": "AD-Act-Text",
                "value": "<div><p>Press up-button &gt;x ms.</p> </div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Act-Type",
                "value": "Actor (Role, Function)"
            }],
            "revision": 1,
            "changedAt": "2013-09-22T14:11:00+02:00",
            "class": "OT-Act"
        }, {
            "id": "MEl-610e0b010000bca80137ac40800bb1b8",
            "title": "Release button",
            "properties": [{
                "title": "dcterms:title",
                "class": "AD-Act-Name",
                "value": "Release button"
            }, {
                "title": "dcterms:description",
                "class": "AD-Act-Text",
                "value": "<div> </div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Act-Type",
                "value": "Actor (Role, Function)"
            }],
            "revision": 1,
            "changedAt": "2012-05-18T19:45:00+02:00",
            "class": "OT-Act"
        }, {
            "id": "MEl-5bcfb01d0000bca80137f303272a5557",
            "title": "Shading",
            "properties": [{
                "title": "dcterms:title",
                "class": "AD-Act-Name",
                "value": "Shading"
            }, {
                "title": "dcterms:description",
                "class": "AD-Act-Text",
                "value": "<div><p>Window-shade with 2 degrees of freedom: It can be moved up/down and the elements can be set straight/tilted. Both movements can be made proportionally with an electric drive.</p> </div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Act-Type",
                "value": "Actor (Role, Function)"
            }],
            "revision": 1,
            "changedAt": "2015-11-08T23:36:00+01:00",
            "class": "OT-Act"
        }, {
            "id": "MEl-5a50d5b60000bca8013781532547ce93",
            "title": "SmartHome Controller",
            "properties": [{
                "title": "dcterms:title",
                "class": "AD-Act-Name",
                "value": "SmartHome Controller"
            }, {
                "title": "dcterms:description",
                "class": "AD-Act-Text",
                "value": "<div><p>The controller </p> <ul> <li>interconnects locally distributed sensors and actuators, </li> <li>coordinates different actuators where appropriate and </li> <li>performes automatic functions, such as switching external lamps dependend on ambient light.</li></ul> </div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Act-Type",
                "value": "Actor (Role, Function)"
            }],
            "revision": 1,
            "changedAt": "2012-10-03T17:46:00+02:00",
            "class": "OT-Act"
        }, {
            "id": "MEl-5b2d29070000bca801378a6c020cf8f5",
            "title": "Start-decreasing",
            "properties": [{
                "title": "dcterms:title",
                "class": "AD-Act-Name",
                "value": "Start-decreasing"
            }, {
                "title": "dcterms:description",
                "class": "AD-Act-Text",
                "value": "<div> </div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Act-Type",
                "value": "Actor (Role, Function)"
            }],
            "revision": 1,
            "changedAt": "2012-05-17T16:35:00+02:00",
            "class": "OT-Act"
        }, {
            "id": "MEl-5b1750f80000bca801373b2d143d7478",
            "title": "Start-increasing",
            "properties": [{
                "title": "dcterms:title",
                "class": "AD-Act-Name",
                "value": "Start-increasing"
            }, {
                "title": "dcterms:description",
                "class": "AD-Act-Text",
                "value": "<div> </div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Act-Type",
                "value": "Actor (Role, Function)"
            }],
            "revision": 1,
            "changedAt": "2012-05-17T16:36:00+02:00",
            "class": "OT-Act"
        }, {
            "id": "MEl-5b2ddad80000bca80137c44d62ba97d8",
            "title": "Stop-decreasing",
            "properties": [{
                "title": "dcterms:title",
                "class": "AD-Act-Name",
                "value": "Stop-decreasing"
            }, {
                "title": "dcterms:description",
                "class": "AD-Act-Text",
                "value": "<div> </div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Act-Type",
                "value": "Actor (Role, Function)"
            }],
            "revision": 1,
            "changedAt": "2012-05-17T16:35:00+02:00",
            "class": "OT-Act"
        }, {
            "id": "MEl-5b2449180000bca8013722c01c9d35a5",
            "title": "Stop-increasing",
            "properties": [{
                "title": "dcterms:title",
                "class": "AD-Act-Name",
                "value": "Stop-increasing"
            }, {
                "title": "dcterms:description",
                "class": "AD-Act-Text",
                "value": "<div> </div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Act-Type",
                "value": "Actor (Role, Function)"
            }],
            "revision": 1,
            "changedAt": "2012-05-17T16:36:00+02:00",
            "class": "OT-Act"
        }, {
            "id": "MEl-5b0839b90000bca801376dcca41ca7d0",
            "title": "Switch-off",
            "properties": [{
                "title": "dcterms:title",
                "class": "AD-Act-Name",
                "value": "Switch-off"
            }, {
                "title": "dcterms:description",
                "class": "AD-Act-Text",
                "value": "<div><p>Switch to programmed min-value.</p> </div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Act-Type",
                "value": "Actor (Role, Function)"
            }],
            "revision": 1,
            "changedAt": "2012-05-17T18:06:00+02:00",
            "class": "OT-Act"
        }, {
            "id": "MEl-5b07e6aa0000bca8013797aad9be69ae",
            "title": "Switch-on",
            "properties": [{
                "title": "dcterms:title",
                "class": "AD-Act-Name",
                "value": "Switch-on"
            }, {
                "title": "dcterms:description",
                "class": "AD-Act-Text",
                "value": "<div><p>Switch to programmed max-value.</p> </div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Act-Type",
                "value": "Actor (Role, Function)"
            }],
            "revision": 1,
            "changedAt": "2012-05-17T15:53:00+02:00",
            "class": "OT-Act"
        }, {
            "id": "MEl-5a47935a0000bca801377c17f8cb25b0",
            "title": "User",
            "properties": [{
                "title": "dcterms:title",
                "class": "AD-Act-Name",
                "value": "User"
            }, {
                "title": "dcterms:description",
                "class": "AD-Act-Text",
                "value": "<div> </div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Act-Type",
                "value": "Actor (Role, Function)"
            }],
            "revision": 1,
            "changedAt": "2012-05-17T19:38:00+02:00",
            "class": "OT-Act"
        }, {
            "id": "MEl-45a236e00000c3a801410f6503287e16",
            "title": "Wait for Activation",
            "properties": [{
                "title": "dcterms:title",
                "class": "AD-Act-Name",
                "value": "Wait for Activation"
            }, {
                "title": "dcterms:description",
                "class": "AD-Act-Text",
                "value": "<div><p>The kind of activation is determined:</p> <ul> <li>Up- or Down-Button</li> <li>Short or long activation: 'Short' is &lt; 0,4 sec.</li> <li>Do only wait until the distinction between 'short' or 'long' can be made!</li></ul> </div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Act-Type",
                "value": "Actor (Role, Function)"
            }],
            "revision": 1,
            "changedAt": "2013-09-22T14:48:00+02:00",
            "class": "OT-Act"
        }, {
            "id": "MEl-45a3b13c0000c3a801415e97f5bc29d1",
            "title": "Wait for Deactivation",
            "properties": [{
                "title": "dcterms:title",
                "class": "AD-Act-Name",
                "value": "Wait for Deactivation"
            }, {
                "title": "dcterms:description",
                "class": "AD-Act-Text",
                "value": "<div> </div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Act-Type",
                "value": "Actor (Role, Function)"
            }],
            "revision": 1,
            "changedAt": "2013-09-22T14:48:00+02:00",
            "class": "OT-Act"
        }, {
            "id": "MEl-5a9b7a9b0000bca80137d768644696b7",
            "title": "Wireless Module",
            "properties": [{
                "title": "dcterms:title",
                "class": "AD-Act-Name",
                "value": "Wireless Module"
            }, {
                "title": "dcterms:description",
                "class": "AD-Act-Text",
                "value": "<div><p>Receives control commands via radio signal or the mechanical position of a mounted sensor unit. Sends electrical control signals to the mounted actuator module.</p> </div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Act-Type",
                "value": "Actor (Role, Function)"
            }],
            "revision": 1,
            "changedAt": "2013-09-22T00:09:00+02:00",
            "class": "OT-Act"
        }, {
            "id": "Fld-59c8a7730000bca80137509a49b1218b-Sta",
            "title": "Type 'State'",
            "properties": [{
                "title": "SpecIF:Heading",
                "class": "AD-Fld-Name",
                "value": "Type 'State'"
            }, {
                "title": "dcterms:description",
                "class": "AD-Fld-Text",
                "value": "<div><p>A 'State' is a fundamental model element type representing a passive entity, be it a value, a condition, an information storage or even a physical shape.</p></div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Fld-Type",
                "value": "Folder"
            }],
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "OT-Fld"
        }, {
            "id": "MEl-5a7776c50000bca8013765ae93af9209",
            "title": "Actuator Rods",
            "properties": [{
                "title": "dcterms:title",
                "class": "AD-Sta-Name",
                "value": "Actuator Rods"
            }, {
                "title": "dcterms:description",
                "class": "AD-Sta-Text",
                "value": "<div><p>Up to four actuator rods connecting the buttons to electrical contacts.</p> </div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Sta-Type",
                "value": "State (Information)"
            }],
            "revision": 1,
            "changedAt": "2013-09-22T00:12:00+02:00",
            "class": "OT-Sta"
        }, {
            "id": "MEl-5a9ce0310000bca801378176dc4744e8",
            "title": "Control Signals",
            "properties": [{
                "title": "dcterms:title",
                "class": "AD-Sta-Name",
                "value": "Control Signals"
            }, {
                "title": "dcterms:description",
                "class": "AD-Sta-Text",
                "value": "<div> </div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Sta-Type",
                "value": "State (Information)"
            }],
            "revision": 1,
            "changedAt": "2014-06-27T02:24:00+02:00",
            "class": "OT-Sta"
        }, {
            "id": "MEl-5a4dd77b0000bca8013736c6912ad291",
            "title": "down",
            "properties": [{
                "title": "dcterms:title",
                "class": "AD-Sta-Name",
                "value": "down"
            }, {
                "title": "dcterms:description",
                "class": "AD-Sta-Text",
                "value": "<div><p>The button to drive down the dimmer, shading or similar devices.</p> </div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Sta-Type",
                "value": "State (Information)"
            }],
            "revision": 1,
            "changedAt": "2015-11-15T13:54:00+01:00",
            "class": "OT-Sta"
        }, {
            "id": "MEl-5a844d820000bca8013750b9a0410b6b",
            "title": "Electro-Magnetic Resistance",
            "properties": [{
                "title": "dcterms:title",
                "class": "AD-Sta-Name",
                "value": "Electro-Magnetic Resistance"
            }, {
                "title": "dcterms:description",
                "class": "AD-Sta-Text",
                "value": "<div><p>Electromagnetic characteristics, especially EM-shielding.</p> </div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Sta-Type",
                "value": "State (Information)"
            }],
            "revision": 1,
            "changedAt": "2013-09-22T00:03:00+02:00",
            "class": "OT-Sta"
        }, {
            "id": "MEl-5a489c300000bca80137ee1373c16844",
            "title": "Flush-mounted Dimmer",
            "properties": [{
                "title": "dcterms:title",
                "class": "AD-Sta-Name",
                "value": "Flush-mounted Dimmer"
            }, {
                "title": "dcterms:description",
                "class": "AD-Sta-Text",
                "value": "<div> </div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Sta-Type",
                "value": "State (Information)"
            }],
            "revision": 1,
            "changedAt": "2012-05-17T17:11:00+02:00",
            "class": "OT-Sta"
        }, {
            "id": "MEl-5a4c80c20000bca8013753b6999a4da8",
            "title": "Flush-mounted Shading Control",
            "properties": [{
                "title": "dcterms:title",
                "class": "AD-Sta-Name",
                "value": "Flush-mounted Shading Control"
            }, {
                "title": "dcterms:description",
                "class": "AD-Sta-Text",
                "value": "<div> </div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Sta-Type",
                "value": "State (Information)"
            }],
            "revision": 1,
            "changedAt": "2012-05-18T20:53:00+02:00",
            "class": "OT-Sta"
        }, {
            "id": "MEl-5a99c89c0000bca801375d44cf9a50ca",
            "title": "Ground Cable",
            "properties": [{
                "title": "dcterms:title",
                "class": "AD-Sta-Name",
                "value": "Ground Cable"
            }, {
                "title": "dcterms:description",
                "class": "AD-Sta-Text",
                "value": "<div><ul> <li>Cable-diameter</li> <li>Wire-diameter</li> <li>Max-current</li></ul> </div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Sta-Type",
                "value": "State (Information)"
            }],
            "revision": 1,
            "changedAt": "2013-09-22T00:16:00+02:00",
            "class": "OT-Sta"
        }, {
            "id": "MEl-5a87083e0000bca801379bb412523737",
            "title": "I/O Pins",
            "properties": [{
                "title": "dcterms:title",
                "class": "AD-Sta-Name",
                "value": "I/O Pins"
            }, {
                "title": "dcterms:description",
                "class": "AD-Sta-Text",
                "value": "<div><p>per input and output signal:</p> <ul> <li>hardware-address</li> <li>number of significant bits</li></ul> </div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Sta-Type",
                "value": "State (Information)"
            }],
            "revision": 1,
            "changedAt": "2014-06-27T02:26:00+02:00",
            "class": "OT-Sta"
        }, {
            "id": "MEl-5a52b50c0000bca801377e3d15255f98",
            "title": "Intelligent Shading Drive",
            "properties": [{
                "title": "dcterms:title",
                "class": "AD-Sta-Name",
                "value": "Intelligent Shading Drive"
            }, {
                "title": "dcterms:description",
                "class": "AD-Sta-Text",
                "value": "<div><p>An intelligent shading actuator with 2 drives for up/down straight/tilt motion. The unit comprises the control unit and the motors.</p> </div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Sta-Type",
                "value": "State (Information)"
            }],
            "revision": 1,
            "changedAt": "2012-05-17T19:18:00+02:00",
            "class": "OT-Sta"
        }, {
            "id": "MEl-5a9929510000bca80137d23c81f1ca54",
            "title": "Load Cable",
            "properties": [{
                "title": "dcterms:title",
                "class": "AD-Sta-Name",
                "value": "Load Cable"
            }, {
                "title": "dcterms:description",
                "class": "AD-Sta-Text",
                "value": "<div><ul> <li>Cable-diameter</li> <li>Wire-diameter</li> <li>Max-current</li></ul> </div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Sta-Type",
                "value": "State (Information)"
            }],
            "revision": 1,
            "changedAt": "2013-09-22T00:15:00+02:00",
            "class": "OT-Sta"
        }, {
            "id": "MEl-5bcf35cf0000bca8013776d68023612a",
            "title": "M",
            "properties": [{
                "title": "dcterms:title",
                "class": "AD-Sta-Name",
                "value": "M"
            }, {
                "title": "dcterms:description",
                "class": "AD-Sta-Text",
                "value": "<div><p>Actuator Motor 230V.</p> </div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Sta-Type",
                "value": "State (Information)"
            }],
            "revision": 1,
            "changedAt": "2012-05-17T19:25:00+02:00",
            "class": "OT-Sta"
        }, {
            "id": "MEl-5c29fb8e0000bca80137eb9734c99bfd",
            "title": "Neutral Cable",
            "properties": [{
                "title": "dcterms:title",
                "class": "AD-Sta-Name",
                "value": "Neutral Cable"
            }, {
                "title": "dcterms:description",
                "class": "AD-Sta-Text",
                "value": "<div><ul> <li>Cable-diameter</li> <li>Wire-diameter</li> <li>Max-current</li></ul> </div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Sta-Type",
                "value": "State (Information)"
            }],
            "revision": 1,
            "changedAt": "2013-09-22T00:15:00+02:00",
            "class": "OT-Sta"
        }, {
            "id": "MEl-5a82ec6f0000bca801372ef053a71bdf",
            "title": "Physical Space",
            "properties": [{
                "title": "dcterms:title",
                "class": "AD-Sta-Name",
                "value": "Physical Space"
            }, {
                "title": "dcterms:description",
                "class": "AD-Sta-Text",
                "value": "<div><p>Effective 3D interior space and mounting for electronics.</p> </div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Sta-Type",
                "value": "State (Information)"
            }],
            "revision": 1,
            "changedAt": "2013-09-22T00:03:00+02:00",
            "class": "OT-Sta"
        }, {
            "id": "MEl-5a86b8980000bca80137ca6fde1a125e",
            "title": "Processor RAM ROM",
            "properties": [{
                "title": "dcterms:title",
                "class": "AD-Sta-Name",
                "value": "Processor RAM ROM"
            }, {
                "title": "dcterms:description",
                "class": "AD-Sta-Text",
                "value": "<div><p>EPROM-Size</p> <p>RAM-Size</p> <p>Processor type with instruction set and speed (MIPS)</p> </div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Sta-Type",
                "value": "State (Information)"
            }],
            "revision": 1,
            "changedAt": "2013-09-22T00:04:00+02:00",
            "class": "OT-Sta"
        }, {
            "id": "MEl-5a51dd920000bca8013770a4395c83fc",
            "title": "Remote Control",
            "properties": [{
                "title": "dcterms:title",
                "class": "AD-Sta-Name",
                "value": "Remote Control"
            }, {
                "title": "dcterms:description",
                "class": "AD-Sta-Text",
                "value": "<div> </div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Sta-Type",
                "value": "State (Information)"
            }],
            "revision": 1,
            "changedAt": "2012-05-17T16:59:00+02:00",
            "class": "OT-Sta"
        }, {
            "id": "MEl-803fd3750000c3a8013cf1fdb3b26d33",
            "title": "SmartHome System",
            "properties": [{
                "title": "dcterms:title",
                "class": "AD-Sta-Name",
                "value": "SmartHome System"
            }, {
                "title": "dcterms:description",
                "class": "AD-Sta-Text",
                "value": "<div><p>The new system for controlling all major functions of the private home:</p> <ul> <li>light/illumination</li> <li>window shades</li> <li>heating</li> <li>consumption meters for electricity, heat, gas and water.</li></ul> </div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Sta-Type",
                "value": "State (Information)"
            }],
            "revision": 1,
            "changedAt": "2013-01-28T09:28:00+01:00",
            "class": "OT-Sta"
        }, {
            "id": "MEl-5a77385f0000bca80137e1c7dc0b1721",
            "title": "Spring Clips",
            "properties": [{
                "title": "dcterms:title",
                "class": "AD-Sta-Name",
                "value": "Spring Clips"
            }, {
                "title": "dcterms:description",
                "class": "AD-Sta-Text",
                "value": "<div><p>Spring clips for mechanical connection.</p> </div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Sta-Type",
                "value": "State (Information)"
            }],
            "revision": 1,
            "changedAt": "2013-09-22T00:12:00+02:00",
            "class": "OT-Sta"
        }, {
            "id": "MEl-5a4cfa830000bca801370d837f761f3e",
            "title": "straighten",
            "properties": [{
                "title": "dcterms:title",
                "class": "AD-Sta-Name",
                "value": "straighten"
            }, {
                "title": "dcterms:description",
                "class": "AD-Sta-Text",
                "value": "<div><p>The button to straighten the shading elements.</p> </div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Sta-Type",
                "value": "State (Information)"
            }],
            "revision": 1,
            "changedAt": "2015-11-08T23:38:00+01:00",
            "class": "OT-Sta"
        }, {
            "id": "MEl-5a9888810000bca801375410ce1cc142",
            "title": "Supply Cable",
            "properties": [{
                "title": "dcterms:title",
                "class": "AD-Sta-Name",
                "value": "Supply Cable"
            }, {
                "title": "dcterms:description",
                "class": "AD-Sta-Text",
                "value": "<div><ul> <li>Cable-diameter</li> <li>Wire-diameter</li> <li>Max-current</li></ul> </div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Sta-Type",
                "value": "State (Information)"
            }],
            "revision": 1,
            "changedAt": "2013-09-22T00:15:00+02:00",
            "class": "OT-Sta"
        }, {
            "id": "MEl-5a820a3c0000bca801378c9093fb7d80",
            "title": "Thermal Resistance",
            "properties": [{
                "title": "dcterms:title",
                "class": "AD-Sta-Name",
                "value": "Thermal Resistance"
            }, {
                "title": "dcterms:description",
                "class": "AD-Sta-Text",
                "value": "<div><p>Thermal resistance and thermal capacity of the [[housing]].</p> </div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Sta-Type",
                "value": "State (Information)"
            }],
            "revision": 1,
            "changedAt": "2013-09-22T00:02:00+02:00",
            "class": "OT-Sta"
        }, {
            "id": "MEl-5a4d2bd00000bca80137a3f233cdffeb",
            "title": "tilt",
            "properties": [{
                "title": "dcterms:title",
                "class": "AD-Sta-Name",
                "value": "tilt"
            }, {
                "title": "dcterms:description",
                "class": "AD-Sta-Text",
                "value": "<div><p>The button to tilt the shading elements.</p> </div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Sta-Type",
                "value": "State (Information)"
            }],
            "revision": 1,
            "changedAt": "2015-11-08T23:38:00+01:00",
            "class": "OT-Sta"
        }, {
            "id": "MEl-5a4d6dee0000bca80137c1caf2f42349",
            "title": "up",
            "properties": [{
                "title": "dcterms:title",
                "class": "AD-Sta-Name",
                "value": "up"
            }, {
                "title": "dcterms:description",
                "class": "AD-Sta-Text",
                "value": "<div><p>The button to drive up the dimmer, shading or similar devices.</p> </div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Sta-Type",
                "value": "State (Information)"
            }],
            "revision": 1,
            "changedAt": "2015-11-15T13:54:00+01:00",
            "class": "OT-Sta"
        }, {
            "id": "MEl-463289cd0000c3a80141be3fc417034a",
            "title": "Wireless Network",
            "properties": [{
                "title": "dcterms:title",
                "class": "AD-Sta-Name",
                "value": "Wireless Network"
            }, {
                "title": "dcterms:description",
                "class": "AD-Sta-Text",
                "value": "<div> </div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Sta-Type",
                "value": "State (Information)"
            }],
            "revision": 1,
            "changedAt": "2014-03-29T16:30:00+01:00",
            "class": "OT-Sta"
        }, {
            "id": "Fld-59c8a7730000bca80137509a49b1218b-Evt",
            "title": "Type 'Event'",
            "properties": [{
                "title": "SpecIF:Heading",
                "class": "AD-Fld-Name",
                "value": "Type 'Event'"
            }, {
                "title": "dcterms:description",
                "class": "AD-Fld-Text",
                "value": "<div><p>An 'Event' is a fundamental model element type representing a time reference, a change in condition/value or more generally a synchronisation primitive.</p></div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Fld-Type",
                "value": "Folder"
            }],
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "OT-Fld"
        }, {
            "id": "MEl-5b2f95ec0000bca8013709bfa81d701f",
            "title": "Decreasing",
            "properties": [{
                "title": "dcterms:title",
                "class": "AD-Evt-Name",
                "value": "Decreasing"
            }, {
                "title": "dcterms:description",
                "class": "AD-Evt-Text",
                "value": "<div> </div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Evt-Type",
                "value": "Event"
            }],
            "revision": 1,
            "changedAt": "2012-05-17T16:24:00+02:00",
            "class": "OT-Evt"
        }, {
            "id": "MEl-453862540000c3a801419d91bef48cfd",
            "title": "Dim-down!",
            "properties": [{
                "title": "dcterms:title",
                "class": "AD-Evt-Name",
                "value": "Dim-down!"
            }, {
                "title": "dcterms:description",
                "class": "AD-Evt-Text",
                "value": "<div> </div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Evt-Type",
                "value": "Event"
            }],
            "revision": 1,
            "changedAt": "2013-09-22T12:30:00+02:00",
            "class": "OT-Evt"
        }, {
            "id": "MEl-45387c0b0000c3a801410aa03f6b9be4",
            "title": "Dim-up!",
            "properties": [{
                "title": "dcterms:title",
                "class": "AD-Evt-Name",
                "value": "Dim-up!"
            }, {
                "title": "dcterms:description",
                "class": "AD-Evt-Text",
                "value": "<div> </div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Evt-Type",
                "value": "Event"
            }],
            "revision": 1,
            "changedAt": "2013-09-22T12:30:00+02:00",
            "class": "OT-Evt"
        }, {
            "id": "MEl-4538920b0000c3a801415c67e334b8a1",
            "title": "Done!",
            "properties": [{
                "title": "dcterms:title",
                "class": "AD-Evt-Name",
                "value": "Done!"
            }, {
                "title": "dcterms:description",
                "class": "AD-Evt-Text",
                "value": "<div> </div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Evt-Type",
                "value": "Event"
            }],
            "revision": 1,
            "changedAt": "2013-09-22T12:30:00+02:00",
            "class": "OT-Evt"
        }, {
            "id": "MEl-45450be80000c3a801414f280f146c71",
            "title": "down-long!",
            "properties": [{
                "title": "dcterms:title",
                "class": "AD-Evt-Name",
                "value": "down-long!"
            }, {
                "title": "dcterms:description",
                "class": "AD-Evt-Text",
                "value": "<div> </div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Evt-Type",
                "value": "Event"
            }],
            "revision": 1,
            "changedAt": "2013-09-22T12:44:00+02:00",
            "class": "OT-Evt"
        }, {
            "id": "MEl-4536b0350000c3a801415986f8ea806a",
            "title": "down-short!",
            "properties": [{
                "title": "dcterms:title",
                "class": "AD-Evt-Name",
                "value": "down-short!"
            }, {
                "title": "dcterms:description",
                "class": "AD-Evt-Text",
                "value": "<div> </div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Evt-Type",
                "value": "Event"
            }],
            "revision": 1,
            "changedAt": "2013-09-22T12:33:00+02:00",
            "class": "OT-Evt"
        }, {
            "id": "MEl-5b149eab0000bca80137aad99b6eea7b",
            "title": "Increasing",
            "properties": [{
                "title": "dcterms:title",
                "class": "AD-Evt-Name",
                "value": "Increasing"
            }, {
                "title": "dcterms:description",
                "class": "AD-Evt-Text",
                "value": "<div> </div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Evt-Type",
                "value": "Event"
            }],
            "revision": 1,
            "changedAt": "2012-05-17T15:55:00+02:00",
            "class": "OT-Evt"
        }, {
            "id": "MEl-5b08ed8d0000bca8013719f554353b0e",
            "title": "Intermediate",
            "properties": [{
                "title": "dcterms:title",
                "class": "AD-Evt-Name",
                "value": "Intermediate"
            }, {
                "title": "dcterms:description",
                "class": "AD-Evt-Text",
                "value": "<div> </div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Evt-Type",
                "value": "Event"
            }],
            "revision": 1,
            "changedAt": "2012-05-17T15:51:00+02:00",
            "class": "OT-Evt"
        }, {
            "id": "MEl-453dfb670000c3a8014191107df4565e",
            "title": "max-reached!",
            "properties": [{
                "title": "dcterms:title",
                "class": "AD-Evt-Name",
                "value": "max-reached!"
            }, {
                "title": "dcterms:description",
                "class": "AD-Evt-Text",
                "value": "<div> </div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Evt-Type",
                "value": "Event"
            }],
            "revision": 1,
            "changedAt": "2013-09-22T12:36:00+02:00",
            "class": "OT-Evt"
        }, {
            "id": "MEl-5b094f8a0000bca801374c798a6587ad",
            "title": "Maximum",
            "properties": [{
                "title": "dcterms:title",
                "class": "AD-Evt-Name",
                "value": "Maximum"
            }, {
                "title": "dcterms:description",
                "class": "AD-Evt-Text",
                "value": "<div> </div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Evt-Type",
                "value": "Event"
            }],
            "revision": 1,
            "changedAt": "2012-05-17T15:42:00+02:00",
            "class": "OT-Evt"
        }, {
            "id": "MEl-45428b930000c3a80141e28b7d4b5ae5",
            "title": "min-reached!",
            "properties": [{
                "title": "dcterms:title",
                "class": "AD-Evt-Name",
                "value": "min-reached!"
            }, {
                "title": "dcterms:description",
                "class": "AD-Evt-Text",
                "value": "<div> </div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Evt-Type",
                "value": "Event"
            }],
            "revision": 1,
            "changedAt": "2013-09-22T12:41:00+02:00",
            "class": "OT-Evt"
        }, {
            "id": "MEl-5b078fa50000bca80137f36ed05c43cb",
            "title": "Minimum",
            "properties": [{
                "title": "dcterms:title",
                "class": "AD-Evt-Name",
                "value": "Minimum"
            }, {
                "title": "dcterms:description",
                "class": "AD-Evt-Text",
                "value": "<div> </div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Evt-Type",
                "value": "Event"
            }],
            "revision": 1,
            "changedAt": "2012-05-17T15:40:00+02:00",
            "class": "OT-Evt"
        }, {
            "id": "MEl-453facbb0000c3a80141c43d2fb4f5e2",
            "title": "released!",
            "properties": [{
                "title": "dcterms:title",
                "class": "AD-Evt-Name",
                "value": "released!"
            }, {
                "title": "dcterms:description",
                "class": "AD-Evt-Text",
                "value": "<div> </div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Evt-Type",
                "value": "Event"
            }],
            "revision": 1,
            "changedAt": "2013-09-22T12:39:00+02:00",
            "class": "OT-Evt"
        }, {
            "id": "MEl-459b92580000c3a80141cb4acb521ab1",
            "title": "Stop dimming!",
            "properties": [{
                "title": "dcterms:title",
                "class": "AD-Evt-Name",
                "value": "Stop dimming!"
            }, {
                "title": "dcterms:description",
                "class": "AD-Evt-Text",
                "value": "<div> </div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Evt-Type",
                "value": "Event"
            }],
            "revision": 1,
            "changedAt": "2013-09-22T14:18:00+02:00",
            "class": "OT-Evt"
        }, {
            "id": "MEl-45384cd10000c3a80141c1f85d7c26e6",
            "title": "Switch-off!",
            "properties": [{
                "title": "dcterms:title",
                "class": "AD-Evt-Name",
                "value": "Switch-off!"
            }, {
                "title": "dcterms:description",
                "class": "AD-Evt-Text",
                "value": "<div> </div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Evt-Type",
                "value": "Event"
            }],
            "revision": 1,
            "changedAt": "2013-09-22T12:30:00+02:00",
            "class": "OT-Evt"
        }, {
            "id": "MEl-607f13b50000bca80137ba95f11856ab",
            "title": "Switch-on!",
            "properties": [{
                "title": "dcterms:title",
                "class": "AD-Evt-Name",
                "value": "Switch-on!"
            }, {
                "title": "dcterms:description",
                "class": "AD-Evt-Text",
                "value": "<div> </div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Evt-Type",
                "value": "Event"
            }],
            "revision": 1,
            "changedAt": "2012-05-18T17:09:00+02:00",
            "class": "OT-Evt"
        }, {
            "id": "MEl-4543fe900000c3a80141f5253ff13c35",
            "title": "up-long!",
            "properties": [{
                "title": "dcterms:title",
                "class": "AD-Evt-Name",
                "value": "up-long!"
            }, {
                "title": "dcterms:description",
                "class": "AD-Evt-Text",
                "value": "<div> </div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Evt-Type",
                "value": "Event"
            }],
            "revision": 1,
            "changedAt": "2013-09-22T12:43:00+02:00",
            "class": "OT-Evt"
        }, {
            "id": "MEl-453d34af0000c3a80141918f84641161",
            "title": "up-short!",
            "properties": [{
                "title": "dcterms:title",
                "class": "AD-Evt-Name",
                "value": "up-short!"
            }, {
                "title": "dcterms:description",
                "class": "AD-Evt-Text",
                "value": "<div> </div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Evt-Type",
                "value": "Event"
            }],
            "revision": 1,
            "changedAt": "2013-09-22T12:35:00+02:00",
            "class": "OT-Evt"
        }, {
            "id": "Fld-59c8a7730000bca80137509a49b1218b",
            "title": "Parts List",
            "properties": [{
                "title": "SpecIF:Heading",
                "class": "AD-Fld-Name",
                "value": "Parts List"
            }, {
                "title": "dcterms:description",
                "class": "AD-Fld-Text",
                "value": "<div>This Parts List has been automatically generated from the model. </div>"
            }, {
                "title": "SpecIF:Type",
                "class": "AD-Fld-Type",
                "value": "Folder"
            }],
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "OT-Fld"
        }],
        "statements": [{
            "id": "RVis-Pln-5a4755dd0000bca801375293a62c90a8-MEl-5bd6bd890000bca8013739588a3f43d6",
            "title": "shows",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Visibility",
            "subject": {
                "id": "Pln-5a4755dd0000bca801375293a62c90a8",
                "revision": 0
            },
            "object": {
                "id": "MEl-5bd6bd890000bca8013739588a3f43d6",
                "revision": 0
            }
        }, {
            "id": "RVis-Pln-5a4755dd0000bca801375293a62c90a8-MEl-5a4dd77b0000bca8013736c6912ad291",
            "title": "shows",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Visibility",
            "subject": "Pln-5a4755dd0000bca801375293a62c90a8",
            "object": "MEl-5a4dd77b0000bca8013736c6912ad291"
        }, {
            "id": "RVis-Pln-5a4755dd0000bca801375293a62c90a8-MEl-5a489c300000bca80137ee1373c16844",
            "title": "shows",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Visibility",
            "subject": {
                "id": "Pln-5a4755dd0000bca801375293a62c90a8",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a489c300000bca80137ee1373c16844",
                "revision": 0
            }
        }, {
            "id": "RVis-Pln-5a4755dd0000bca801375293a62c90a8-MEl-5a4c80c20000bca8013753b6999a4da8",
            "title": "shows",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Visibility",
            "subject": {
                "id": "Pln-5a4755dd0000bca801375293a62c90a8",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a4c80c20000bca8013753b6999a4da8",
                "revision": 0
            }
        }, {
            "id": "RVis-Pln-5a4755dd0000bca801375293a62c90a8-MEl-5a52b50c0000bca801377e3d15255f98",
            "title": "shows",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Visibility",
            "subject": {
                "id": "Pln-5a4755dd0000bca801375293a62c90a8",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a52b50c0000bca801377e3d15255f98",
                "revision": 0
            }
        }, {
            "id": "RVis-Pln-5a4755dd0000bca801375293a62c90a8-MEl-5bcf35cf0000bca8013776d68023612a",
            "title": "shows",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Visibility",
            "subject": {
                "id": "Pln-5a4755dd0000bca801375293a62c90a8",
                "revision": 0
            },
            "object": {
                "id": "MEl-5bcf35cf0000bca8013776d68023612a",
                "revision": 0
            }
        }, {
            "id": "RVis-Pln-5a4755dd0000bca801375293a62c90a8-MEl-5a51dd920000bca8013770a4395c83fc",
            "title": "shows",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Visibility",
            "subject": {
                "id": "Pln-5a4755dd0000bca801375293a62c90a8",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a51dd920000bca8013770a4395c83fc",
                "revision": 0
            }
        }, {
            "id": "RVis-Pln-5a4755dd0000bca801375293a62c90a8-MEl-5bcfb01d0000bca80137f303272a5557",
            "title": "shows",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Visibility",
            "subject": {
                "id": "Pln-5a4755dd0000bca801375293a62c90a8",
                "revision": 0
            },
            "object": {
                "id": "MEl-5bcfb01d0000bca80137f303272a5557",
                "revision": 0
            }
        }, {
            "id": "RVis-Pln-5a4755dd0000bca801375293a62c90a8-MEl-5a50d5b60000bca8013781532547ce93",
            "title": "shows",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Visibility",
            "subject": {
                "id": "Pln-5a4755dd0000bca801375293a62c90a8",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a50d5b60000bca8013781532547ce93",
                "revision": 0
            }
        }, {
            "id": "RVis-Pln-5a4755dd0000bca801375293a62c90a8-MEl-803fd3750000c3a8013cf1fdb3b26d33",
            "title": "shows",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Visibility",
            "subject": {
                "id": "Pln-5a4755dd0000bca801375293a62c90a8",
                "revision": 0
            },
            "object": {
                "id": "MEl-803fd3750000c3a8013cf1fdb3b26d33",
                "revision": 0
            }
        }, {
            "id": "RVis-Pln-5a4755dd0000bca801375293a62c90a8-MEl-5a4cfa830000bca801370d837f761f3e",
            "title": "shows",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Visibility",
            "subject": {
                "id": "Pln-5a4755dd0000bca801375293a62c90a8",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a4cfa830000bca801370d837f761f3e",
                "revision": 0
            }
        }, {
            "id": "RVis-Pln-5a4755dd0000bca801375293a62c90a8-MEl-5a4d2bd00000bca80137a3f233cdffeb",
            "title": "shows",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Visibility",
            "subject": {
                "id": "Pln-5a4755dd0000bca801375293a62c90a8",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a4d2bd00000bca80137a3f233cdffeb",
                "revision": 0
            }
        }, {
            "id": "RVis-Pln-5a4755dd0000bca801375293a62c90a8-MEl-5a4d6dee0000bca80137c1caf2f42349",
            "title": "shows",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Visibility",
            "subject": {
                "id": "Pln-5a4755dd0000bca801375293a62c90a8",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a4d6dee0000bca80137c1caf2f42349",
                "revision": 0
            }
        }, {
            "id": "RVis-Pln-5a4755dd0000bca801375293a62c90a8-MEl-5a47935a0000bca801377c17f8cb25b0",
            "title": "shows",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Visibility",
            "subject": {
                "id": "Pln-5a4755dd0000bca801375293a62c90a8",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a47935a0000bca801377c17f8cb25b0",
                "revision": 0
            }
        }, {
            "id": "RVis-Pln-5a6cdea50000bca80137d6b2d6e8a3a0-MEl-5a7776c50000bca8013765ae93af9209",
            "title": "shows",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Visibility",
            "subject": {
                "id": "Pln-5a6cdea50000bca80137d6b2d6e8a3a0",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a7776c50000bca8013765ae93af9209",
                "revision": 0
            }
        }, {
            "id": "RVis-Pln-5a6cdea50000bca80137d6b2d6e8a3a0-MEl-5a76365c0000bca8013776e91afd1e8e",
            "title": "shows",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Visibility",
            "subject": {
                "id": "Pln-5a6cdea50000bca80137d6b2d6e8a3a0",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a76365c0000bca8013776e91afd1e8e",
                "revision": 0
            }
        }, {
            "id": "RVis-Pln-5a6cdea50000bca80137d6b2d6e8a3a0-MEl-5a9ce0310000bca801378176dc4744e8",
            "title": "shows",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Visibility",
            "subject": {
                "id": "Pln-5a6cdea50000bca80137d6b2d6e8a3a0",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a9ce0310000bca801378176dc4744e8",
                "revision": 0
            }
        }, {
            "id": "RVis-Pln-5a6cdea50000bca80137d6b2d6e8a3a0-MEl-5a752ccc0000bca80137479a2e8bab30",
            "title": "shows",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Visibility",
            "subject": {
                "id": "Pln-5a6cdea50000bca80137d6b2d6e8a3a0",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a752ccc0000bca80137479a2e8bab30",
                "revision": 0
            }
        }, {
            "id": "RVis-Pln-5a6cdea50000bca80137d6b2d6e8a3a0-MEl-5a71c4800000bca80137f2aaa7b63000",
            "title": "shows",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Visibility",
            "subject": {
                "id": "Pln-5a6cdea50000bca80137d6b2d6e8a3a0",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a71c4800000bca80137f2aaa7b63000",
                "revision": 0
            }
        }, {
            "id": "RVis-Pln-5a6cdea50000bca80137d6b2d6e8a3a0-MEl-5a4dd77b0000bca8013736c6912ad291",
            "title": "shows",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Visibility",
            "subject": {
                "id": "Pln-5a6cdea50000bca80137d6b2d6e8a3a0",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a4dd77b0000bca8013736c6912ad291",
                "revision": 0
            }
        }, {
            "id": "RVis-Pln-5a6cdea50000bca80137d6b2d6e8a3a0-MEl-5a489c300000bca80137ee1373c16844",
            "title": "shows",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Visibility",
            "subject": {
                "id": "Pln-5a6cdea50000bca80137d6b2d6e8a3a0",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a489c300000bca80137ee1373c16844",
                "revision": 0
            }
        }, {
            "id": "RVis-Pln-5a6cdea50000bca80137d6b2d6e8a3a0-MEl-5a99c89c0000bca801375d44cf9a50ca",
            "title": "shows",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Visibility",
            "subject": {
                "id": "Pln-5a6cdea50000bca80137d6b2d6e8a3a0",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a99c89c0000bca801375d44cf9a50ca",
                "revision": 0
            }
        }, {
            "id": "RVis-Pln-5a6cdea50000bca80137d6b2d6e8a3a0-MEl-5a9929510000bca80137d23c81f1ca54",
            "title": "shows",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Visibility",
            "subject": {
                "id": "Pln-5a6cdea50000bca80137d6b2d6e8a3a0",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a9929510000bca80137d23c81f1ca54",
                "revision": 0
            }
        }, {
            "id": "RVis-Pln-5a6cdea50000bca80137d6b2d6e8a3a0-MEl-5c29fb8e0000bca80137eb9734c99bfd",
            "title": "shows",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Visibility",
            "subject": {
                "id": "Pln-5a6cdea50000bca80137d6b2d6e8a3a0",
                "revision": 0
            },
            "object": {
                "id": "MEl-5c29fb8e0000bca80137eb9734c99bfd",
                "revision": 0
            }
        }, {
            "id": "RVis-Pln-5a6cdea50000bca80137d6b2d6e8a3a0-MEl-5a77385f0000bca80137e1c7dc0b1721",
            "title": "shows",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Visibility",
            "subject": {
                "id": "Pln-5a6cdea50000bca80137d6b2d6e8a3a0",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a77385f0000bca80137e1c7dc0b1721",
                "revision": 0
            }
        }, {
            "id": "RVis-Pln-5a6cdea50000bca80137d6b2d6e8a3a0-MEl-5a9888810000bca801375410ce1cc142",
            "title": "shows",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Visibility",
            "subject": {
                "id": "Pln-5a6cdea50000bca80137d6b2d6e8a3a0",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a9888810000bca801375410ce1cc142",
                "revision": 0
            }
        }, {
            "id": "RVis-Pln-5a6cdea50000bca80137d6b2d6e8a3a0-MEl-5a4d6dee0000bca80137c1caf2f42349",
            "title": "shows",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Visibility",
            "subject": {
                "id": "Pln-5a6cdea50000bca80137d6b2d6e8a3a0",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a4d6dee0000bca80137c1caf2f42349",
                "revision": 0
            }
        }, {
            "id": "RVis-Pln-5a6cdea50000bca80137d6b2d6e8a3a0-MEl-5a9b7a9b0000bca80137d768644696b7",
            "title": "shows",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Visibility",
            "subject": {
                "id": "Pln-5a6cdea50000bca80137d6b2d6e8a3a0",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a9b7a9b0000bca80137d768644696b7",
                "revision": 0
            }
        }, {
            "id": "RVis-Pln-5a6cdea50000bca80137d6b2d6e8a3a0-MEl-463289cd0000c3a80141be3fc417034a",
            "title": "shows",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Visibility",
            "subject": {
                "id": "Pln-5a6cdea50000bca80137d6b2d6e8a3a0",
                "revision": 0
            },
            "object": {
                "id": "MEl-463289cd0000c3a80141be3fc417034a",
                "revision": 0
            }
        }, {
            "id": "RVis-Pln-5a7f99af0000bca8013754f2ef12d3e5-MEl-5a9ce0310000bca801378176dc4744e8",
            "title": "shows",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Visibility",
            "subject": {
                "id": "Pln-5a7f99af0000bca8013754f2ef12d3e5",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a9ce0310000bca801378176dc4744e8",
                "revision": 0
            }
        }, {
            "id": "RVis-Pln-5a7f99af0000bca8013754f2ef12d3e5-MEl-5a85347c0000bca80137ad485c7cd330",
            "title": "shows",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Visibility",
            "subject": {
                "id": "Pln-5a7f99af0000bca8013754f2ef12d3e5",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a85347c0000bca80137ad485c7cd330",
                "revision": 0
            }
        }, {
            "id": "RVis-Pln-5a7f99af0000bca8013754f2ef12d3e5-MEl-5a808e2a0000bca80137bfd74268a84a",
            "title": "shows",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Visibility",
            "subject": {
                "id": "Pln-5a7f99af0000bca8013754f2ef12d3e5",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a808e2a0000bca80137bfd74268a84a",
                "revision": 0
            }
        }, {
            "id": "RVis-Pln-5a7f99af0000bca8013754f2ef12d3e5-MEl-5a752ccc0000bca80137479a2e8bab30",
            "title": "shows",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Visibility",
            "subject": {
                "id": "Pln-5a7f99af0000bca8013754f2ef12d3e5",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a752ccc0000bca80137479a2e8bab30",
                "revision": 0
            }
        }, {
            "id": "RVis-Pln-5a7f99af0000bca8013754f2ef12d3e5-MEl-5a844d820000bca8013750b9a0410b6b",
            "title": "shows",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Visibility",
            "subject": {
                "id": "Pln-5a7f99af0000bca8013754f2ef12d3e5",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a844d820000bca8013750b9a0410b6b",
                "revision": 0
            }
        }, {
            "id": "RVis-Pln-5a7f99af0000bca8013754f2ef12d3e5-MEl-5a99c89c0000bca801375d44cf9a50ca",
            "title": "shows",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Visibility",
            "subject": {
                "id": "Pln-5a7f99af0000bca8013754f2ef12d3e5",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a99c89c0000bca801375d44cf9a50ca",
                "revision": 0
            }
        }, {
            "id": "RVis-Pln-5a7f99af0000bca8013754f2ef12d3e5-MEl-5a8009a00000bca80137ef95bc3f643f",
            "title": "shows",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Visibility",
            "subject": {
                "id": "Pln-5a7f99af0000bca8013754f2ef12d3e5",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a8009a00000bca80137ef95bc3f643f",
                "revision": 0
            }
        }, {
            "id": "RVis-Pln-5a7f99af0000bca8013754f2ef12d3e5-MEl-5a87083e0000bca801379bb412523737",
            "title": "shows",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Visibility",
            "subject": {
                "id": "Pln-5a7f99af0000bca8013754f2ef12d3e5",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a87083e0000bca801379bb412523737",
                "revision": 0
            }
        }, {
            "id": "RVis-Pln-5a7f99af0000bca8013754f2ef12d3e5-MEl-5a9929510000bca80137d23c81f1ca54",
            "title": "shows",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Visibility",
            "subject": {
                "id": "Pln-5a7f99af0000bca8013754f2ef12d3e5",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a9929510000bca80137d23c81f1ca54",
                "revision": 0
            }
        }, {
            "id": "RVis-Pln-5a7f99af0000bca8013754f2ef12d3e5-MEl-5c29fb8e0000bca80137eb9734c99bfd",
            "title": "shows",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Visibility",
            "subject": {
                "id": "Pln-5a7f99af0000bca8013754f2ef12d3e5",
                "revision": 0
            },
            "object": {
                "id": "MEl-5c29fb8e0000bca80137eb9734c99bfd",
                "revision": 0
            }
        }, {
            "id": "RVis-Pln-5a7f99af0000bca8013754f2ef12d3e5-MEl-5a82ec6f0000bca801372ef053a71bdf",
            "title": "shows",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Visibility",
            "subject": {
                "id": "Pln-5a7f99af0000bca8013754f2ef12d3e5",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a82ec6f0000bca801372ef053a71bdf",
                "revision": 0
            }
        }, {
            "id": "RVis-Pln-5a7f99af0000bca8013754f2ef12d3e5-MEl-5a86b8980000bca80137ca6fde1a125e",
            "title": "shows",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Visibility",
            "subject": {
                "id": "Pln-5a7f99af0000bca8013754f2ef12d3e5",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a86b8980000bca80137ca6fde1a125e",
                "revision": 0
            }
        }, {
            "id": "RVis-Pln-5a7f99af0000bca8013754f2ef12d3e5-MEl-5a77385f0000bca80137e1c7dc0b1721",
            "title": "shows",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Visibility",
            "subject": {
                "id": "Pln-5a7f99af0000bca8013754f2ef12d3e5",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a77385f0000bca80137e1c7dc0b1721",
                "revision": 0
            }
        }, {
            "id": "RVis-Pln-5a7f99af0000bca8013754f2ef12d3e5-MEl-5a9888810000bca801375410ce1cc142",
            "title": "shows",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Visibility",
            "subject": {
                "id": "Pln-5a7f99af0000bca8013754f2ef12d3e5",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a9888810000bca801375410ce1cc142",
                "revision": 0
            }
        }, {
            "id": "RVis-Pln-5a7f99af0000bca8013754f2ef12d3e5-MEl-5a820a3c0000bca801378c9093fb7d80",
            "title": "shows",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Visibility",
            "subject": {
                "id": "Pln-5a7f99af0000bca8013754f2ef12d3e5",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a820a3c0000bca801378c9093fb7d80",
                "revision": 0
            }
        }, {
            "id": "RVis-Pln-606e76c70000bca801376ec3133a1181-MEl-608177820000bca801379179ebf3b6aa",
            "title": "shows",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Visibility",
            "subject": {
                "id": "Pln-606e76c70000bca801376ec3133a1181",
                "revision": 0
            },
            "object": {
                "id": "MEl-608177820000bca801379179ebf3b6aa",
                "revision": 0
            }
        }, {
            "id": "RVis-Pln-606e76c70000bca801376ec3133a1181-MEl-611366530000bca80137a97f194e96a3",
            "title": "shows",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Visibility",
            "subject": {
                "id": "Pln-606e76c70000bca801376ec3133a1181",
                "revision": 0
            },
            "object": {
                "id": "MEl-611366530000bca80137a97f194e96a3",
                "revision": 0
            }
        }, {
            "id": "RVis-Pln-606e76c70000bca801376ec3133a1181-MEl-453862540000c3a801419d91bef48cfd",
            "title": "shows",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Visibility",
            "subject": {
                "id": "Pln-606e76c70000bca801376ec3133a1181",
                "revision": 0
            },
            "object": {
                "id": "MEl-453862540000c3a801419d91bef48cfd",
                "revision": 0
            }
        }, {
            "id": "RVis-Pln-606e76c70000bca801376ec3133a1181-MEl-45387c0b0000c3a801410aa03f6b9be4",
            "title": "shows",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Visibility",
            "subject": {
                "id": "Pln-606e76c70000bca801376ec3133a1181",
                "revision": 0
            },
            "object": {
                "id": "MEl-45387c0b0000c3a801410aa03f6b9be4",
                "revision": 0
            }
        }, {
            "id": "RVis-Pln-606e76c70000bca801376ec3133a1181-MEl-4538920b0000c3a801415c67e334b8a1",
            "title": "shows",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Visibility",
            "subject": {
                "id": "Pln-606e76c70000bca801376ec3133a1181",
                "revision": 0
            },
            "object": {
                "id": "MEl-4538920b0000c3a801415c67e334b8a1",
                "revision": 0
            }
        }, {
            "id": "RVis-Pln-606e76c70000bca801376ec3133a1181-MEl-608239830000bca801373690c7d2af0f",
            "title": "shows",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Visibility",
            "subject": {
                "id": "Pln-606e76c70000bca801376ec3133a1181",
                "revision": 0
            },
            "object": {
                "id": "MEl-608239830000bca801373690c7d2af0f",
                "revision": 0
            }
        }, {
            "id": "RVis-Pln-606e76c70000bca801376ec3133a1181-MEl-610b07100000bca80137c10f96c46247",
            "title": "shows",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Visibility",
            "subject": {
                "id": "Pln-606e76c70000bca801376ec3133a1181",
                "revision": 0
            },
            "object": {
                "id": "MEl-610b07100000bca80137c10f96c46247",
                "revision": 0
            }
        }, {
            "id": "RVis-Pln-606e76c70000bca801376ec3133a1181-MEl-610e0b010000bca80137ac40800bb1b8",
            "title": "shows",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Visibility",
            "subject": {
                "id": "Pln-606e76c70000bca801376ec3133a1181",
                "revision": 0
            },
            "object": {
                "id": "MEl-610e0b010000bca80137ac40800bb1b8",
                "revision": 0
            }
        }, {
            "id": "RVis-Pln-606e76c70000bca801376ec3133a1181-MEl-459b92580000c3a80141cb4acb521ab1",
            "title": "shows",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Visibility",
            "subject": {
                "id": "Pln-606e76c70000bca801376ec3133a1181",
                "revision": 0
            },
            "object": {
                "id": "MEl-459b92580000c3a80141cb4acb521ab1",
                "revision": 0
            }
        }, {
            "id": "RVis-Pln-606e76c70000bca801376ec3133a1181-MEl-45384cd10000c3a80141c1f85d7c26e6",
            "title": "shows",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Visibility",
            "subject": {
                "id": "Pln-606e76c70000bca801376ec3133a1181",
                "revision": 0
            },
            "object": {
                "id": "MEl-45384cd10000c3a80141c1f85d7c26e6",
                "revision": 0
            }
        }, {
            "id": "RVis-Pln-606e76c70000bca801376ec3133a1181-MEl-607f13b50000bca80137ba95f11856ab",
            "title": "shows",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Visibility",
            "subject": {
                "id": "Pln-606e76c70000bca801376ec3133a1181",
                "revision": 0
            },
            "object": {
                "id": "MEl-607f13b50000bca80137ba95f11856ab",
                "revision": 0
            }
        }, {
            "id": "RVis-Pln-606e76c70000bca801376ec3133a1181-MEl-5a47935a0000bca801377c17f8cb25b0",
            "title": "shows",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Visibility",
            "subject": {
                "id": "Pln-606e76c70000bca801376ec3133a1181",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a47935a0000bca801377c17f8cb25b0",
                "revision": 0
            }
        }, {
            "id": "RVis-Pln-45a1c8930000c3a801414cd1eaa70b5a-MEl-606f16ac0000bca801373587fda932b3",
            "title": "shows",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Visibility",
            "subject": {
                "id": "Pln-45a1c8930000c3a801414cd1eaa70b5a",
                "revision": 0
            },
            "object": {
                "id": "MEl-606f16ac0000bca801373587fda932b3",
                "revision": 0
            }
        }, {
            "id": "RVis-Pln-45a1c8930000c3a801414cd1eaa70b5a-MEl-45450be80000c3a801414f280f146c71",
            "title": "shows",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Visibility",
            "subject": {
                "id": "Pln-45a1c8930000c3a801414cd1eaa70b5a",
                "revision": 0
            },
            "object": {
                "id": "MEl-45450be80000c3a801414f280f146c71",
                "revision": 0
            }
        }, {
            "id": "RVis-Pln-45a1c8930000c3a801414cd1eaa70b5a-MEl-4536b0350000c3a801415986f8ea806a",
            "title": "shows",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Visibility",
            "subject": {
                "id": "Pln-45a1c8930000c3a801414cd1eaa70b5a",
                "revision": 0
            },
            "object": {
                "id": "MEl-4536b0350000c3a801415986f8ea806a",
                "revision": 0
            }
        }, {
            "id": "RVis-Pln-45a1c8930000c3a801414cd1eaa70b5a-MEl-453facbb0000c3a80141c43d2fb4f5e2",
            "title": "shows",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Visibility",
            "subject": {
                "id": "Pln-45a1c8930000c3a801414cd1eaa70b5a",
                "revision": 0
            },
            "object": {
                "id": "MEl-453facbb0000c3a80141c43d2fb4f5e2",
                "revision": 0
            }
        }, {
            "id": "RVis-Pln-45a1c8930000c3a801414cd1eaa70b5a-MEl-4543fe900000c3a80141f5253ff13c35",
            "title": "shows",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Visibility",
            "subject": {
                "id": "Pln-45a1c8930000c3a801414cd1eaa70b5a",
                "revision": 0
            },
            "object": {
                "id": "MEl-4543fe900000c3a80141f5253ff13c35",
                "revision": 0
            }
        }, {
            "id": "RVis-Pln-45a1c8930000c3a801414cd1eaa70b5a-MEl-453d34af0000c3a80141918f84641161",
            "title": "shows",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Visibility",
            "subject": {
                "id": "Pln-45a1c8930000c3a801414cd1eaa70b5a",
                "revision": 0
            },
            "object": {
                "id": "MEl-453d34af0000c3a80141918f84641161",
                "revision": 0
            }
        }, {
            "id": "RVis-Pln-45a1c8930000c3a801414cd1eaa70b5a-MEl-45a236e00000c3a801410f6503287e16",
            "title": "shows",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Visibility",
            "subject": {
                "id": "Pln-45a1c8930000c3a801414cd1eaa70b5a",
                "revision": 0
            },
            "object": {
                "id": "MEl-45a236e00000c3a801410f6503287e16",
                "revision": 0
            }
        }, {
            "id": "RVis-Pln-45a1c8930000c3a801414cd1eaa70b5a-MEl-45a3b13c0000c3a801415e97f5bc29d1",
            "title": "shows",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Visibility",
            "subject": {
                "id": "Pln-45a1c8930000c3a801414cd1eaa70b5a",
                "revision": 0
            },
            "object": {
                "id": "MEl-45a3b13c0000c3a801415e97f5bc29d1",
                "revision": 0
            }
        }, {
            "id": "RVis-Pln-5af364560000bca80137b84017f4e832-MEl-5b2f95ec0000bca8013709bfa81d701f",
            "title": "shows",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Visibility",
            "subject": {
                "id": "Pln-5af364560000bca80137b84017f4e832",
                "revision": 0
            },
            "object": {
                "id": "MEl-5b2f95ec0000bca8013709bfa81d701f",
                "revision": 0
            }
        }, {
            "id": "RVis-Pln-5af364560000bca80137b84017f4e832-MEl-5a85347c0000bca80137ad485c7cd330",
            "title": "shows",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Visibility",
            "subject": "Pln-5af364560000bca80137b84017f4e832",
            "object": "MEl-5a85347c0000bca80137ad485c7cd330"
        }, {
            "id": "RVis-Pln-5af364560000bca80137b84017f4e832-MEl-45450be80000c3a801414f280f146c71",
            "title": "shows",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Visibility",
            "subject": "Pln-5af364560000bca80137b84017f4e832",
            "object": "MEl-45450be80000c3a801414f280f146c71"
        }, {
            "id": "RVis-Pln-5af364560000bca80137b84017f4e832-MEl-4536b0350000c3a801415986f8ea806a",
            "title": "shows",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Visibility",
            "subject": {
                "id": "Pln-5af364560000bca80137b84017f4e832",
                "revision": 0
            },
            "object": {
                "id": "MEl-4536b0350000c3a801415986f8ea806a",
                "revision": 0
            }
        }, {
            "id": "RVis-Pln-5af364560000bca80137b84017f4e832-MEl-5b149eab0000bca80137aad99b6eea7b",
            "title": "shows",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Visibility",
            "subject": {
                "id": "Pln-5af364560000bca80137b84017f4e832",
                "revision": 0
            },
            "object": {
                "id": "MEl-5b149eab0000bca80137aad99b6eea7b",
                "revision": 0
            }
        }, {
            "id": "RVis-Pln-5af364560000bca80137b84017f4e832-MEl-5b08ed8d0000bca8013719f554353b0e",
            "title": "shows",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Visibility",
            "subject": {
                "id": "Pln-5af364560000bca80137b84017f4e832",
                "revision": 0
            },
            "object": {
                "id": "MEl-5b08ed8d0000bca8013719f554353b0e",
                "revision": 0
            }
        }, {
            "id": "RVis-Pln-5af364560000bca80137b84017f4e832-MEl-453dfb670000c3a8014191107df4565e",
            "title": "shows",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Visibility",
            "subject": {
                "id": "Pln-5af364560000bca80137b84017f4e832",
                "revision": 0
            },
            "object": {
                "id": "MEl-453dfb670000c3a8014191107df4565e",
                "revision": 0
            }
        }, {
            "id": "RVis-Pln-5af364560000bca80137b84017f4e832-MEl-5b094f8a0000bca801374c798a6587ad",
            "title": "shows",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Visibility",
            "subject": {
                "id": "Pln-5af364560000bca80137b84017f4e832",
                "revision": 0
            },
            "object": {
                "id": "MEl-5b094f8a0000bca801374c798a6587ad",
                "revision": 0
            }
        }, {
            "id": "RVis-Pln-5af364560000bca80137b84017f4e832-MEl-45428b930000c3a80141e28b7d4b5ae5",
            "title": "shows",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Visibility",
            "subject": {
                "id": "Pln-5af364560000bca80137b84017f4e832",
                "revision": 0
            },
            "object": {
                "id": "MEl-45428b930000c3a80141e28b7d4b5ae5",
                "revision": 0
            }
        }, {
            "id": "RVis-Pln-5af364560000bca80137b84017f4e832-MEl-5b078fa50000bca80137f36ed05c43cb",
            "title": "shows",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Visibility",
            "subject": {
                "id": "Pln-5af364560000bca80137b84017f4e832",
                "revision": 0
            },
            "object": {
                "id": "MEl-5b078fa50000bca80137f36ed05c43cb",
                "revision": 0
            }
        }, {
            "id": "RVis-Pln-5af364560000bca80137b84017f4e832-MEl-453facbb0000c3a80141c43d2fb4f5e2",
            "title": "shows",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Visibility",
            "subject": {
                "id": "Pln-5af364560000bca80137b84017f4e832",
                "revision": 0
            },
            "object": {
                "id": "MEl-453facbb0000c3a80141c43d2fb4f5e2",
                "revision": 0
            }
        }, {
            "id": "RVis-Pln-5af364560000bca80137b84017f4e832-MEl-5b2d29070000bca801378a6c020cf8f5",
            "title": "shows",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Visibility",
            "subject": {
                "id": "Pln-5af364560000bca80137b84017f4e832",
                "revision": 0
            },
            "object": {
                "id": "MEl-5b2d29070000bca801378a6c020cf8f5",
                "revision": 0
            }
        }, {
            "id": "RVis-Pln-5af364560000bca80137b84017f4e832-MEl-5b1750f80000bca801373b2d143d7478",
            "title": "shows",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Visibility",
            "subject": {
                "id": "Pln-5af364560000bca80137b84017f4e832",
                "revision": 0
            },
            "object": {
                "id": "MEl-5b1750f80000bca801373b2d143d7478",
                "revision": 0
            }
        }, {
            "id": "RVis-Pln-5af364560000bca80137b84017f4e832-MEl-5b2ddad80000bca80137c44d62ba97d8",
            "title": "shows",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Visibility",
            "subject": {
                "id": "Pln-5af364560000bca80137b84017f4e832",
                "revision": 0
            },
            "object": {
                "id": "MEl-5b2ddad80000bca80137c44d62ba97d8",
                "revision": 0
            }
        }, {
            "id": "RVis-Pln-5af364560000bca80137b84017f4e832-MEl-5b2449180000bca8013722c01c9d35a5",
            "title": "shows",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Visibility",
            "subject": {
                "id": "Pln-5af364560000bca80137b84017f4e832",
                "revision": 0
            },
            "object": {
                "id": "MEl-5b2449180000bca8013722c01c9d35a5",
                "revision": 0
            }
        }, {
            "id": "RVis-Pln-5af364560000bca80137b84017f4e832-MEl-5b0839b90000bca801376dcca41ca7d0",
            "title": "shows",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Visibility",
            "subject": {
                "id": "Pln-5af364560000bca80137b84017f4e832",
                "revision": 0
            },
            "object": {
                "id": "MEl-5b0839b90000bca801376dcca41ca7d0",
                "revision": 0
            }
        }, {
            "id": "RVis-Pln-5af364560000bca80137b84017f4e832-MEl-5b07e6aa0000bca8013797aad9be69ae",
            "title": "shows",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Visibility",
            "subject": {
                "id": "Pln-5af364560000bca80137b84017f4e832",
                "revision": 0
            },
            "object": {
                "id": "MEl-5b07e6aa0000bca8013797aad9be69ae",
                "revision": 0
            }
        }, {
            "id": "RVis-Pln-5af364560000bca80137b84017f4e832-MEl-4543fe900000c3a80141f5253ff13c35",
            "title": "shows",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Visibility",
            "subject": {
                "id": "Pln-5af364560000bca80137b84017f4e832",
                "revision": 0
            },
            "object": {
                "id": "MEl-4543fe900000c3a80141f5253ff13c35",
                "revision": 0
            }
        }, {
            "id": "RVis-Pln-5af364560000bca80137b84017f4e832-MEl-453d34af0000c3a80141918f84641161",
            "title": "shows",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Visibility",
            "subject": {
                "id": "Pln-5af364560000bca80137b84017f4e832",
                "revision": 0
            },
            "object": {
                "id": "MEl-453d34af0000c3a80141918f84641161",
                "revision": 0
            }
        }, {
            "id": "RSat-MEl-5a85347c0000bca80137ad485c7cd330-Req-d1c895230000c3a80150f8afd049f738",
            "title": "satisfies",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Satisfaction",
            "subject": {
                "id": "MEl-5a85347c0000bca80137ad485c7cd330",
                "revision": 0
            },
            "object": {
                "id": "Req-d1c895230000c3a80150f8afd049f738",
                "revision": 0
            }
        }, {
            "id": "R-RpgwxaijQtHjsE71uYHiTJyJW79",
            "title": "depends on",
            "revision": 14,
            "changedAt": "2016-11-10T14:07:29+01:00",
            "changedBy": "od",
            "class": "RT-Dependency",
            "subject": {
                "id": "Req-d1c895230000c3a80150f8afd049f738",
                "revision": 0
            },
            "object": {
                "id": "Req-d1cd7f370000c3a8015095e6ee21aab7",
                "revision": 0
            }
        }, {
            "id": "R-2hkTtbuV2BjIYernvDaRZXDFV1Q",
            "title": "satisfies",
            "revision": 52,
            "changedAt": "2016-12-21T16:32:25+01:00",
            "changedBy": "od",
            "class": "RT-Satisfaction",
            "subject": {
                "id": "MEl-5a808e2a0000bca80137bfd74268a84a",
                "revision": 0
            },
            "object": {
                "id": "Req-d1c895230000c3a80150f8afd049f738",
                "revision": 0
            }
        }, {
            "id": "R-tA5fx5sgbN3nJReiqqzE6PvBhbt",
            "title": "satisfies",
            "revision": 63,
            "changedAt": "2017-01-04T10:05:19+01:00",
            "changedBy": "od",
            "class": "RT-Satisfaction",
            "subject": {
                "id": "MEl-5a752ccc0000bca80137479a2e8bab30",
                "revision": 0
            },
            "object": {
                "id": "Req-d1c895230000c3a80150f8afd049f738",
                "revision": 0
            }
        }, {
            "id": "RSat-MEl-5a85347c0000bca80137ad485c7cd330-Req-d1d42a6a0000c3a8015091ec8d149b93",
            "title": "satisfies",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Satisfaction",
            "subject": {
                "id": "MEl-5a85347c0000bca80137ad485c7cd330",
                "revision": 0
            },
            "object": {
                "id": "Req-d1d42a6a0000c3a8015091ec8d149b93",
                "revision": 0
            }
        }, {
            "id": "RSat-MEl-5a85347c0000bca80137ad485c7cd330-Req-d1cd7f370000c3a8015095e6ee21aab7",
            "title": "satisfies",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Satisfaction",
            "subject": {
                "id": "MEl-5a85347c0000bca80137ad485c7cd330",
                "revision": 0
            },
            "object": {
                "id": "Req-d1cd7f370000c3a8015095e6ee21aab7",
                "revision": 0
            }
        }, {
            "id": "RSat-MEl-5a71c4800000bca80137f2aaa7b63000-Req-5ba3512b0000bca801371cc0617eb4c1",
            "title": "satisfies",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Satisfaction",
            "subject": {
                "id": "MEl-5a71c4800000bca80137f2aaa7b63000",
                "revision": 0
            },
            "object": {
                "id": "Req-5ba3512b0000bca801371cc0617eb4c1",
                "revision": 0
            }
        }, {
            "id": "RSat-MEl-5a808e2a0000bca80137bfd74268a84a-Req-5b8fbb300000bca80137c73e3ce4c737",
            "title": "satisfies",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Satisfaction",
            "subject": {
                "id": "MEl-5a808e2a0000bca80137bfd74268a84a",
                "revision": 0
            },
            "object": {
                "id": "Req-5b8fbb300000bca80137c73e3ce4c737",
                "revision": 0
            }
        }, {
            "id": "RSat-MEl-5a47935a0000bca801377c17f8cb25b0-Req-5b944fc70000bca8013763f44fdc0e03",
            "title": "satisfies",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Satisfaction",
            "subject": {
                "id": "MEl-5a47935a0000bca801377c17f8cb25b0",
                "revision": 0
            },
            "object": {
                "id": "Req-5b944fc70000bca8013763f44fdc0e03",
                "revision": 0
            }
        }, {
            "id": "RCnc-Iss-ee2abb630000c3a8013987a750219659-Req-5b944fc70000bca8013763f44fdc0e03",
            "title": "refers to",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Concern",
            "subject": {
                "id": "Iss-ee2abb630000c3a8013987a750219659",
                "revision": 0
            },
            "object": {
                "id": "Req-5b944fc70000bca8013763f44fdc0e03",
                "revision": 0
            }
        }, {
            "id": "RSat-MEl-5a752ccc0000bca80137479a2e8bab30-Req-5ba140d60000bca801372b09f9888eca",
            "title": "satisfies",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Satisfaction",
            "subject": {
                "id": "MEl-5a752ccc0000bca80137479a2e8bab30",
                "revision": 0
            },
            "object": {
                "id": "Req-5ba140d60000bca801372b09f9888eca",
                "revision": 0
            }
        }, {
            "id": "RSat-MEl-5a9b7a9b0000bca80137d768644696b7-Req-5ba140d60000bca801372b09f9888eca",
            "title": "satisfies",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Satisfaction",
            "subject": {
                "id": "MEl-5a9b7a9b0000bca80137d768644696b7",
                "revision": 0
            },
            "object": {
                "id": "Req-5ba140d60000bca801372b09f9888eca",
                "revision": 0
            }
        }, {
            "id": "RSat-MEl-803fd3750000c3a8013cf1fdb3b26d33-Req-ee452cf20000c3a8014035290669304d",
            "title": "satisfies",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Satisfaction",
            "subject": {
                "id": "MEl-803fd3750000c3a8013cf1fdb3b26d33",
                "revision": 0
            },
            "object": {
                "id": "Req-ee452cf20000c3a8014035290669304d",
                "revision": 0
            }
        }, {
            "id": "R-UZD4SQ8jYghL2Tsb4tZjoXDSYoM",
            "title": "satisfies",
            "revision": 65,
            "changedAt": "2017-01-04T10:07:20+01:00",
            "changedBy": "od",
            "class": "RT-Satisfaction",
            "subject": {
                "id": "MEl-5a752ccc0000bca80137479a2e8bab30",
                "revision": 0
            },
            "object": {
                "id": "Req-ee452cf20000c3a8014035290669304d",
                "revision": 0
            }
        }, {
            "id": "RSat-MEl-5a489c300000bca80137ee1373c16844-Req-ee43fc4c0000c3a8014063d42c77767f",
            "title": "satisfies",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Satisfaction",
            "subject": {
                "id": "MEl-5a489c300000bca80137ee1373c16844",
                "revision": 0
            },
            "object": {
                "id": "Req-ee43fc4c0000c3a8014063d42c77767f",
                "revision": 0
            }
        }, {
            "id": "RSat-MEl-5a4c80c20000bca8013753b6999a4da8-Req-ee43fc4c0000c3a8014063d42c77767f",
            "title": "satisfies",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Satisfaction",
            "subject": {
                "id": "MEl-5a4c80c20000bca8013753b6999a4da8",
                "revision": 0
            },
            "object": {
                "id": "Req-ee43fc4c0000c3a8014063d42c77767f",
                "revision": 0
            }
        }, {
            "id": "RSat-MEl-5a52b50c0000bca801377e3d15255f98-Req-ee43fc4c0000c3a8014063d42c77767f",
            "title": "satisfies",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Satisfaction",
            "subject": {
                "id": "MEl-5a52b50c0000bca801377e3d15255f98",
                "revision": 0
            },
            "object": {
                "id": "Req-ee43fc4c0000c3a8014063d42c77767f",
                "revision": 0
            }
        }, {
            "id": "RSat-MEl-5a50d5b60000bca8013781532547ce93-Req-ee43fc4c0000c3a8014063d42c77767f",
            "title": "satisfies",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Satisfaction",
            "subject": {
                "id": "MEl-5a50d5b60000bca8013781532547ce93",
                "revision": 0
            },
            "object": {
                "id": "Req-ee43fc4c0000c3a8014063d42c77767f",
                "revision": 0
            }
        }, {
            "id": "RDep-Req-ee43fc4c0000c3a8014063d42c77767f-Req-5b9c950e0000bca801374f16615247b9",
            "title": "depends on",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Dependency",
            "subject": {
                "id": "Req-ee43fc4c0000c3a8014063d42c77767f",
                "revision": 0
            },
            "object": {
                "id": "Req-5b9c950e0000bca801374f16615247b9",
                "revision": 0
            }
        }, {
            "id": "RSat-MEl-5a808e2a0000bca80137bfd74268a84a-Req-5b9124bc0000bca80137fa2ce86f5eca",
            "title": "satisfies",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Satisfaction",
            "subject": {
                "id": "MEl-5a808e2a0000bca80137bfd74268a84a",
                "revision": 0
            },
            "object": {
                "id": "Req-5b9124bc0000bca80137fa2ce86f5eca",
                "revision": 0
            }
        }, {
            "id": "RSat-MEl-5a52b50c0000bca801377e3d15255f98-Req-5b9124bc0000bca80137fa2ce86f5eca",
            "title": "satisfies",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Satisfaction",
            "subject": {
                "id": "MEl-5a52b50c0000bca801377e3d15255f98",
                "revision": 0
            },
            "object": {
                "id": "Req-5b9124bc0000bca80137fa2ce86f5eca",
                "revision": 0
            }
        }, {
            "id": "RSat-MEl-5a808e2a0000bca80137bfd74268a84a-Req-5b9e68530000bca801371362c49d2d08",
            "title": "satisfies",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Satisfaction",
            "subject": {
                "id": "MEl-5a808e2a0000bca80137bfd74268a84a",
                "revision": 0
            },
            "object": {
                "id": "Req-5b9e68530000bca801371362c49d2d08",
                "revision": 0
            }
        }, {
            "id": "RSat-MEl-5a52b50c0000bca801377e3d15255f98-Req-5b9e68530000bca801371362c49d2d08",
            "title": "satisfies",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Satisfaction",
            "subject": {
                "id": "MEl-5a52b50c0000bca801377e3d15255f98",
                "revision": 0
            },
            "object": {
                "id": "Req-5b9e68530000bca801371362c49d2d08",
                "revision": 0
            }
        }, {
            "id": "RSat-MEl-803fd3750000c3a8013cf1fdb3b26d33-Req-eea1cd500000c3a80140fe00109eb7f4",
            "title": "satisfies",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Satisfaction",
            "subject": {
                "id": "MEl-803fd3750000c3a8013cf1fdb3b26d33",
                "revision": 0
            },
            "object": {
                "id": "Req-eea1cd500000c3a80140fe00109eb7f4",
                "revision": 0
            }
        }, {
            "id": "R-lELLVnNbbagfomwYyTBgGfXSalj",
            "title": "satisfies",
            "revision": 62,
            "changedAt": "2017-01-04T10:04:12+01:00",
            "changedBy": "od",
            "class": "RT-Satisfaction",
            "subject": {
                "id": "MEl-5a752ccc0000bca80137479a2e8bab30",
                "revision": 0
            },
            "object": {
                "id": "Req-eea1cd500000c3a80140fe00109eb7f4",
                "revision": 0
            }
        }, {
            "id": "RSat-MEl-5a489c300000bca80137ee1373c16844-Req-5b95fae40000bca801372becc933682d",
            "title": "satisfies",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Satisfaction",
            "subject": {
                "id": "MEl-5a489c300000bca80137ee1373c16844",
                "revision": 0
            },
            "object": {
                "id": "Req-5b95fae40000bca801372becc933682d",
                "revision": 0
            }
        }, {
            "id": "RSat-MEl-5a4c80c20000bca8013753b6999a4da8-Req-5b95fae40000bca801372becc933682d",
            "title": "satisfies",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Satisfaction",
            "subject": {
                "id": "MEl-5a4c80c20000bca8013753b6999a4da8",
                "revision": 0
            },
            "object": {
                "id": "Req-5b95fae40000bca801372becc933682d",
                "revision": 0
            }
        }, {
            "id": "RSat-MEl-5a489c300000bca80137ee1373c16844-Req-5b9ab8a50000bca801377ad0be3bbc89",
            "title": "satisfies",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Satisfaction",
            "subject": {
                "id": "MEl-5a489c300000bca80137ee1373c16844",
                "revision": 0
            },
            "object": {
                "id": "Req-5b9ab8a50000bca801377ad0be3bbc89",
                "revision": 0
            }
        }, {
            "id": "RSat-MEl-5a52b50c0000bca801377e3d15255f98-Req-5b9ab8a50000bca801377ad0be3bbc89",
            "title": "satisfies",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Satisfaction",
            "subject": {
                "id": "MEl-5a52b50c0000bca801377e3d15255f98",
                "revision": 0
            },
            "object": {
                "id": "Req-5b9ab8a50000bca801377ad0be3bbc89",
                "revision": 0
            }
        }, {
            "id": "R-NJ2iOLwt4CEpcf8IidN1z0P4d0m",
            "title": "satisfies",
            "revision": 64,
            "changedAt": "2017-01-04T10:06:48+01:00",
            "changedBy": "od",
            "class": "RT-Satisfaction",
            "subject": {
                "id": "MEl-5a752ccc0000bca80137479a2e8bab30",
                "revision": 0
            },
            "object": {
                "id": "Req-5b9ab8a50000bca801377ad0be3bbc89",
                "revision": 0
            }
        }, {
            "id": "RSat-MEl-5a808e2a0000bca80137bfd74268a84a-Req-728c69c80018b1a8014b974542c36edc",
            "title": "satisfies",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Satisfaction",
            "subject": {
                "id": "MEl-5a808e2a0000bca80137bfd74268a84a",
                "revision": 0
            },
            "object": {
                "id": "Req-728c69c80018b1a8014b974542c36edc",
                "revision": 0
            }
        }, {
            "id": "RSat-MEl-5a85347c0000bca80137ad485c7cd330-Req-5b9c950e0000bca801374f16615247b9",
            "title": "satisfies",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Satisfaction",
            "subject": {
                "id": "MEl-5a85347c0000bca80137ad485c7cd330",
                "revision": 0
            },
            "object": {
                "id": "Req-5b9c950e0000bca801374f16615247b9",
                "revision": 0
            }
        }, {
            "id": "RCnc-Iss-ee2abb630000c3a8013987a750219659-MEl-5a8009a00000bca80137ef95bc3f643f",
            "title": "refers to",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Concern",
            "subject": {
                "id": "Iss-ee2abb630000c3a8013987a750219659",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a8009a00000bca80137ef95bc3f643f",
                "revision": 0
            }
        }, {
            "id": "RWri-MEl-5a76365c0000bca8013776e91afd1e8e-MEl-5a77385f0000bca80137e1c7dc0b1721",
            "title": "writes",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Writing",
            "subject": {
                "id": "MEl-5a76365c0000bca8013776e91afd1e8e",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a77385f0000bca80137e1c7dc0b1721",
                "revision": 0
            }
        }, {
            "id": "RRea-MEl-5a76365c0000bca8013776e91afd1e8e-MEl-5a77385f0000bca80137e1c7dc0b1721",
            "title": "reads",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Reading",
            "subject": {
                "id": "MEl-5a76365c0000bca8013776e91afd1e8e",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a77385f0000bca80137e1c7dc0b1721",
                "revision": 0
            }
        }, {
            "id": "RCtn-MEl-5a489c300000bca80137ee1373c16844-MEl-5a76365c0000bca8013776e91afd1e8e",
            "title": "contains",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Containment",
            "subject": {
                "id": "MEl-5a489c300000bca80137ee1373c16844",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a76365c0000bca8013776e91afd1e8e",
                "revision": 0
            }
        }, {
            "id": "RCtn-MEl-5a47935a0000bca801377c17f8cb25b0-MEl-608177820000bca801379179ebf3b6aa",
            "title": "contains",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Containment",
            "subject": {
                "id": "MEl-5a47935a0000bca801377c17f8cb25b0",
                "revision": 0
            },
            "object": {
                "id": "MEl-608177820000bca801379179ebf3b6aa",
                "revision": 0
            }
        }, {
            "id": "RCtn-MEl-5a47935a0000bca801377c17f8cb25b0-MEl-611366530000bca80137a97f194e96a3",
            "title": "contains",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Containment",
            "subject": {
                "id": "MEl-5a47935a0000bca801377c17f8cb25b0",
                "revision": 0
            },
            "object": {
                "id": "MEl-611366530000bca80137a97f194e96a3",
                "revision": 0
            }
        }, {
            "id": "RRea-MEl-5bd6bd890000bca8013739588a3f43d6-MEl-5a489c300000bca80137ee1373c16844",
            "title": "reads",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Reading",
            "subject": {
                "id": "MEl-5bd6bd890000bca8013739588a3f43d6",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a489c300000bca80137ee1373c16844",
                "revision": 0
            }
        }, {
            "id": "RCtn-MEl-5a85347c0000bca80137ad485c7cd330-MEl-45450be80000c3a801414f280f146c71",
            "title": "contains",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Containment",
            "subject": {
                "id": "MEl-5a85347c0000bca80137ad485c7cd330",
                "revision": 0
            },
            "object": {
                "id": "MEl-45450be80000c3a801414f280f146c71",
                "revision": 0
            }
        }, {
            "id": "RCtn-MEl-5a85347c0000bca80137ad485c7cd330-MEl-4536b0350000c3a801415986f8ea806a",
            "title": "contains",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Containment",
            "subject": {
                "id": "MEl-5a85347c0000bca80137ad485c7cd330",
                "revision": 0
            },
            "object": {
                "id": "MEl-4536b0350000c3a801415986f8ea806a",
                "revision": 0
            }
        }, {
            "id": "RCtn-MEl-5a85347c0000bca80137ad485c7cd330-MEl-5b08ed8d0000bca8013719f554353b0e",
            "title": "contains",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Containment",
            "subject": {
                "id": "MEl-5a85347c0000bca80137ad485c7cd330",
                "revision": 0
            },
            "object": {
                "id": "MEl-5b08ed8d0000bca8013719f554353b0e",
                "revision": 0
            }
        }, {
            "id": "RCtn-MEl-5a85347c0000bca80137ad485c7cd330-MEl-453dfb670000c3a8014191107df4565e",
            "title": "contains",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Containment",
            "subject": {
                "id": "MEl-5a85347c0000bca80137ad485c7cd330",
                "revision": 0
            },
            "object": {
                "id": "MEl-453dfb670000c3a8014191107df4565e",
                "revision": 0
            }
        }, {
            "id": "RCtn-MEl-5a85347c0000bca80137ad485c7cd330-MEl-5b094f8a0000bca801374c798a6587ad",
            "title": "contains",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Containment",
            "subject": {
                "id": "MEl-5a85347c0000bca80137ad485c7cd330",
                "revision": 0
            },
            "object": {
                "id": "MEl-5b094f8a0000bca801374c798a6587ad",
                "revision": 0
            }
        }, {
            "id": "RCtn-MEl-5a85347c0000bca80137ad485c7cd330-MEl-45428b930000c3a80141e28b7d4b5ae5",
            "title": "contains",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Containment",
            "subject": {
                "id": "MEl-5a85347c0000bca80137ad485c7cd330",
                "revision": 0
            },
            "object": {
                "id": "MEl-45428b930000c3a80141e28b7d4b5ae5",
                "revision": 0
            }
        }, {
            "id": "RCtn-MEl-5a85347c0000bca80137ad485c7cd330-MEl-5b078fa50000bca80137f36ed05c43cb",
            "title": "contains",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Containment",
            "subject": {
                "id": "MEl-5a85347c0000bca80137ad485c7cd330",
                "revision": 0
            },
            "object": {
                "id": "MEl-5b078fa50000bca80137f36ed05c43cb",
                "revision": 0
            }
        }, {
            "id": "RCtn-MEl-5a85347c0000bca80137ad485c7cd330-MEl-453facbb0000c3a80141c43d2fb4f5e2",
            "title": "contains",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Containment",
            "subject": {
                "id": "MEl-5a85347c0000bca80137ad485c7cd330",
                "revision": 0
            },
            "object": {
                "id": "MEl-453facbb0000c3a80141c43d2fb4f5e2",
                "revision": 0
            }
        }, {
            "id": "RCtn-MEl-5a85347c0000bca80137ad485c7cd330-MEl-5b0839b90000bca801376dcca41ca7d0",
            "title": "contains",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Containment",
            "subject": {
                "id": "MEl-5a85347c0000bca80137ad485c7cd330",
                "revision": 0
            },
            "object": {
                "id": "MEl-5b0839b90000bca801376dcca41ca7d0",
                "revision": 0
            }
        }, {
            "id": "RCtn-MEl-5a85347c0000bca80137ad485c7cd330-MEl-5b07e6aa0000bca8013797aad9be69ae",
            "title": "contains",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Containment",
            "subject": {
                "id": "MEl-5a85347c0000bca80137ad485c7cd330",
                "revision": 0
            },
            "object": {
                "id": "MEl-5b07e6aa0000bca8013797aad9be69ae",
                "revision": 0
            }
        }, {
            "id": "RCtn-MEl-5a85347c0000bca80137ad485c7cd330-MEl-4543fe900000c3a80141f5253ff13c35",
            "title": "contains",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Containment",
            "subject": {
                "id": "MEl-5a85347c0000bca80137ad485c7cd330",
                "revision": 0
            },
            "object": {
                "id": "MEl-4543fe900000c3a80141f5253ff13c35",
                "revision": 0
            }
        }, {
            "id": "RCtn-MEl-5a85347c0000bca80137ad485c7cd330-MEl-453d34af0000c3a80141918f84641161",
            "title": "contains",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Containment",
            "subject": {
                "id": "MEl-5a85347c0000bca80137ad485c7cd330",
                "revision": 0
            },
            "object": {
                "id": "MEl-453d34af0000c3a80141918f84641161",
                "revision": 0
            }
        }, {
            "id": "RRea-MEl-5a85347c0000bca80137ad485c7cd330-MEl-5a87083e0000bca801379bb412523737",
            "title": "reads",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Reading",
            "subject": {
                "id": "MEl-5a85347c0000bca80137ad485c7cd330",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a87083e0000bca801379bb412523737",
                "revision": 0
            }
        }, {
            "id": "RRea-MEl-5a85347c0000bca80137ad485c7cd330-MEl-5a86b8980000bca80137ca6fde1a125e",
            "title": "reads",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Reading",
            "subject": {
                "id": "MEl-5a85347c0000bca80137ad485c7cd330",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a86b8980000bca80137ca6fde1a125e",
                "revision": 0
            }
        }, {
            "id": "RCtn-MEl-5a752ccc0000bca80137479a2e8bab30-MEl-5a85347c0000bca80137ad485c7cd330",
            "title": "contains",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Containment",
            "subject": {
                "id": "MEl-5a752ccc0000bca80137479a2e8bab30",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a85347c0000bca80137ad485c7cd330",
                "revision": 0
            }
        }, {
            "id": "RWri-MEl-5a808e2a0000bca80137bfd74268a84a-MEl-5a99c89c0000bca801375d44cf9a50ca",
            "title": "writes",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Writing",
            "subject": {
                "id": "MEl-5a808e2a0000bca80137bfd74268a84a",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a99c89c0000bca801375d44cf9a50ca",
                "revision": 0
            }
        }, {
            "id": "RRea-MEl-5a808e2a0000bca80137bfd74268a84a-MEl-5a99c89c0000bca801375d44cf9a50ca",
            "title": "reads",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Reading",
            "subject": {
                "id": "MEl-5a808e2a0000bca80137bfd74268a84a",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a99c89c0000bca801375d44cf9a50ca",
                "revision": 0
            }
        }, {
            "id": "RWri-MEl-5a808e2a0000bca80137bfd74268a84a-MEl-5a9929510000bca80137d23c81f1ca54",
            "title": "writes",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Writing",
            "subject": {
                "id": "MEl-5a808e2a0000bca80137bfd74268a84a",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a9929510000bca80137d23c81f1ca54",
                "revision": 0
            }
        }, {
            "id": "RRea-MEl-5a808e2a0000bca80137bfd74268a84a-MEl-5a9929510000bca80137d23c81f1ca54",
            "title": "reads",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Reading",
            "subject": {
                "id": "MEl-5a808e2a0000bca80137bfd74268a84a",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a9929510000bca80137d23c81f1ca54",
                "revision": 0
            }
        }, {
            "id": "RWri-MEl-5a808e2a0000bca80137bfd74268a84a-MEl-5c29fb8e0000bca80137eb9734c99bfd",
            "title": "writes",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Writing",
            "subject": {
                "id": "MEl-5a808e2a0000bca80137bfd74268a84a",
                "revision": 0
            },
            "object": {
                "id": "MEl-5c29fb8e0000bca80137eb9734c99bfd",
                "revision": 0
            }
        }, {
            "id": "RRea-MEl-5a808e2a0000bca80137bfd74268a84a-MEl-5c29fb8e0000bca80137eb9734c99bfd",
            "title": "reads",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Reading",
            "subject": {
                "id": "MEl-5a808e2a0000bca80137bfd74268a84a",
                "revision": 0
            },
            "object": {
                "id": "MEl-5c29fb8e0000bca80137eb9734c99bfd",
                "revision": 0
            }
        }, {
            "id": "RWri-MEl-5a808e2a0000bca80137bfd74268a84a-MEl-5a9888810000bca801375410ce1cc142",
            "title": "writes",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Writing",
            "subject": {
                "id": "MEl-5a808e2a0000bca80137bfd74268a84a",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a9888810000bca801375410ce1cc142",
                "revision": 0
            }
        }, {
            "id": "RRea-MEl-5a808e2a0000bca80137bfd74268a84a-MEl-5a9888810000bca801375410ce1cc142",
            "title": "reads",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Reading",
            "subject": {
                "id": "MEl-5a808e2a0000bca80137bfd74268a84a",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a9888810000bca801375410ce1cc142",
                "revision": 0
            }
        }, {
            "id": "RWri-MEl-5a808e2a0000bca80137bfd74268a84a-MEl-5a87083e0000bca801379bb412523737",
            "title": "writes",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Writing",
            "subject": {
                "id": "MEl-5a808e2a0000bca80137bfd74268a84a",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a87083e0000bca801379bb412523737",
                "revision": 0
            }
        }, {
            "id": "RWri-MEl-5a808e2a0000bca80137bfd74268a84a-MEl-5a86b8980000bca80137ca6fde1a125e",
            "title": "writes",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Writing",
            "subject": {
                "id": "MEl-5a808e2a0000bca80137bfd74268a84a",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a86b8980000bca80137ca6fde1a125e",
                "revision": 0
            }
        }, {
            "id": "RRea-MEl-5a808e2a0000bca80137bfd74268a84a-MEl-5a9ce0310000bca801378176dc4744e8",
            "title": "reads",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Reading",
            "subject": {
                "id": "MEl-5a808e2a0000bca80137bfd74268a84a",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a9ce0310000bca801378176dc4744e8",
                "revision": 0
            }
        }, {
            "id": "RRea-MEl-5a808e2a0000bca80137bfd74268a84a-MEl-5a844d820000bca8013750b9a0410b6b",
            "title": "reads",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Reading",
            "subject": {
                "id": "MEl-5a808e2a0000bca80137bfd74268a84a",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a844d820000bca8013750b9a0410b6b",
                "revision": 0
            }
        }, {
            "id": "RRea-MEl-5a808e2a0000bca80137bfd74268a84a-MEl-5a82ec6f0000bca801372ef053a71bdf",
            "title": "reads",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Reading",
            "subject": {
                "id": "MEl-5a808e2a0000bca80137bfd74268a84a",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a82ec6f0000bca801372ef053a71bdf",
                "revision": 0
            }
        }, {
            "id": "RRea-MEl-5a808e2a0000bca80137bfd74268a84a-MEl-5a820a3c0000bca801378c9093fb7d80",
            "title": "reads",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Reading",
            "subject": {
                "id": "MEl-5a808e2a0000bca80137bfd74268a84a",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a820a3c0000bca801378c9093fb7d80",
                "revision": 0
            }
        }, {
            "id": "RCtn-MEl-5a752ccc0000bca80137479a2e8bab30-MEl-5a808e2a0000bca80137bfd74268a84a",
            "title": "contains",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Containment",
            "subject": {
                "id": "MEl-5a752ccc0000bca80137479a2e8bab30",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a808e2a0000bca80137bfd74268a84a",
                "revision": 0
            }
        }, {
            "id": "RCtn-MEl-5a752ccc0000bca80137479a2e8bab30-MEl-5a844d820000bca8013750b9a0410b6b",
            "title": "contains",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Containment",
            "subject": {
                "id": "MEl-5a752ccc0000bca80137479a2e8bab30",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a844d820000bca8013750b9a0410b6b",
                "revision": 0
            }
        }, {
            "id": "RCtn-MEl-5a752ccc0000bca80137479a2e8bab30-MEl-5a8009a00000bca80137ef95bc3f643f",
            "title": "contains",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Containment",
            "subject": {
                "id": "MEl-5a752ccc0000bca80137479a2e8bab30",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a8009a00000bca80137ef95bc3f643f",
                "revision": 0
            }
        }, {
            "id": "RCtn-MEl-5a752ccc0000bca80137479a2e8bab30-MEl-5a87083e0000bca801379bb412523737",
            "title": "contains",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Containment",
            "subject": {
                "id": "MEl-5a752ccc0000bca80137479a2e8bab30",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a87083e0000bca801379bb412523737",
                "revision": 0
            }
        }, {
            "id": "RCtn-MEl-5a752ccc0000bca80137479a2e8bab30-MEl-5a82ec6f0000bca801372ef053a71bdf",
            "title": "contains",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Containment",
            "subject": {
                "id": "MEl-5a752ccc0000bca80137479a2e8bab30",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a82ec6f0000bca801372ef053a71bdf",
                "revision": 0
            }
        }, {
            "id": "RCtn-MEl-5a752ccc0000bca80137479a2e8bab30-MEl-5a86b8980000bca80137ca6fde1a125e",
            "title": "contains",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Containment",
            "subject": {
                "id": "MEl-5a752ccc0000bca80137479a2e8bab30",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a86b8980000bca80137ca6fde1a125e",
                "revision": 0
            }
        }, {
            "id": "RCtn-MEl-5a752ccc0000bca80137479a2e8bab30-MEl-5a820a3c0000bca801378c9093fb7d80",
            "title": "contains",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Containment",
            "subject": {
                "id": "MEl-5a752ccc0000bca80137479a2e8bab30",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a820a3c0000bca801378c9093fb7d80",
                "revision": 0
            }
        }, {
            "id": "RRea-MEl-5a752ccc0000bca80137479a2e8bab30-MEl-5a9ce0310000bca801378176dc4744e8",
            "title": "reads",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Reading",
            "subject": {
                "id": "MEl-5a752ccc0000bca80137479a2e8bab30",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a9ce0310000bca801378176dc4744e8",
                "revision": 0
            }
        }, {
            "id": "RCtn-MEl-5a489c300000bca80137ee1373c16844-MEl-5a752ccc0000bca80137479a2e8bab30",
            "title": "contains",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Containment",
            "subject": {
                "id": "MEl-5a489c300000bca80137ee1373c16844",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a752ccc0000bca80137479a2e8bab30",
                "revision": 0
            }
        }, {
            "id": "RWri-MEl-5a71c4800000bca80137f2aaa7b63000-MEl-5a77385f0000bca80137e1c7dc0b1721",
            "title": "writes",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Writing",
            "subject": {
                "id": "MEl-5a71c4800000bca80137f2aaa7b63000",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a77385f0000bca80137e1c7dc0b1721",
                "revision": 0
            }
        }, {
            "id": "RRea-MEl-5a71c4800000bca80137f2aaa7b63000-MEl-5a77385f0000bca80137e1c7dc0b1721",
            "title": "reads",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Reading",
            "subject": {
                "id": "MEl-5a71c4800000bca80137f2aaa7b63000",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a77385f0000bca80137e1c7dc0b1721",
                "revision": 0
            }
        }, {
            "id": "RWri-MEl-5a71c4800000bca80137f2aaa7b63000-MEl-5a7776c50000bca8013765ae93af9209",
            "title": "writes",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Writing",
            "subject": {
                "id": "MEl-5a71c4800000bca80137f2aaa7b63000",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a7776c50000bca8013765ae93af9209",
                "revision": 0
            }
        }, {
            "id": "RRea-MEl-5a71c4800000bca80137f2aaa7b63000-MEl-5a4dd77b0000bca8013736c6912ad291",
            "title": "reads",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Reading",
            "subject": {
                "id": "MEl-5a71c4800000bca80137f2aaa7b63000",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a4dd77b0000bca8013736c6912ad291",
                "revision": 0
            }
        }, {
            "id": "RRea-MEl-5a71c4800000bca80137f2aaa7b63000-MEl-5a4d6dee0000bca80137c1caf2f42349",
            "title": "reads",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Reading",
            "subject": {
                "id": "MEl-5a71c4800000bca80137f2aaa7b63000",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a4d6dee0000bca80137c1caf2f42349",
                "revision": 0
            }
        }, {
            "id": "RCtn-MEl-5a489c300000bca80137ee1373c16844-MEl-5a71c4800000bca80137f2aaa7b63000",
            "title": "contains",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Containment",
            "subject": {
                "id": "MEl-5a489c300000bca80137ee1373c16844",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a71c4800000bca80137f2aaa7b63000",
                "revision": 0
            }
        }, {
            "id": "RCtn-MEl-606f16ac0000bca801373587fda932b3-MEl-45450be80000c3a801414f280f146c71",
            "title": "contains",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Containment",
            "subject": {
                "id": "MEl-606f16ac0000bca801373587fda932b3",
                "revision": 0
            },
            "object": {
                "id": "MEl-45450be80000c3a801414f280f146c71",
                "revision": 0
            }
        }, {
            "id": "RCtn-MEl-606f16ac0000bca801373587fda932b3-MEl-4536b0350000c3a801415986f8ea806a",
            "title": "contains",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Containment",
            "subject": {
                "id": "MEl-606f16ac0000bca801373587fda932b3",
                "revision": 0
            },
            "object": {
                "id": "MEl-4536b0350000c3a801415986f8ea806a",
                "revision": 0
            }
        }, {
            "id": "RCtn-MEl-606f16ac0000bca801373587fda932b3-MEl-453facbb0000c3a80141c43d2fb4f5e2",
            "title": "contains",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Containment",
            "subject": {
                "id": "MEl-606f16ac0000bca801373587fda932b3",
                "revision": 0
            },
            "object": {
                "id": "MEl-453facbb0000c3a80141c43d2fb4f5e2",
                "revision": 0
            }
        }, {
            "id": "RCtn-MEl-606f16ac0000bca801373587fda932b3-MEl-4543fe900000c3a80141f5253ff13c35",
            "title": "contains",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Containment",
            "subject": {
                "id": "MEl-606f16ac0000bca801373587fda932b3",
                "revision": 0
            },
            "object": {
                "id": "MEl-4543fe900000c3a80141f5253ff13c35",
                "revision": 0
            }
        }, {
            "id": "RCtn-MEl-606f16ac0000bca801373587fda932b3-MEl-453d34af0000c3a80141918f84641161",
            "title": "contains",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Containment",
            "subject": {
                "id": "MEl-606f16ac0000bca801373587fda932b3",
                "revision": 0
            },
            "object": {
                "id": "MEl-453d34af0000c3a80141918f84641161",
                "revision": 0
            }
        }, {
            "id": "RCtn-MEl-606f16ac0000bca801373587fda932b3-MEl-45a236e00000c3a801410f6503287e16",
            "title": "contains",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Containment",
            "subject": {
                "id": "MEl-606f16ac0000bca801373587fda932b3",
                "revision": 0
            },
            "object": {
                "id": "MEl-45a236e00000c3a801410f6503287e16",
                "revision": 0
            }
        }, {
            "id": "RCtn-MEl-606f16ac0000bca801373587fda932b3-MEl-45a3b13c0000c3a801415e97f5bc29d1",
            "title": "contains",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Containment",
            "subject": {
                "id": "MEl-606f16ac0000bca801373587fda932b3",
                "revision": 0
            },
            "object": {
                "id": "MEl-45a3b13c0000c3a801415e97f5bc29d1",
                "revision": 0
            }
        }, {
            "id": "RWri-MEl-5a8009a00000bca80137ef95bc3f643f-MEl-5a77385f0000bca80137e1c7dc0b1721",
            "title": "writes",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Writing",
            "subject": {
                "id": "MEl-5a8009a00000bca80137ef95bc3f643f",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a77385f0000bca80137e1c7dc0b1721",
                "revision": 0
            }
        }, {
            "id": "RRea-MEl-5a8009a00000bca80137ef95bc3f643f-MEl-5a77385f0000bca80137e1c7dc0b1721",
            "title": "reads",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Reading",
            "subject": {
                "id": "MEl-5a8009a00000bca80137ef95bc3f643f",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a77385f0000bca80137e1c7dc0b1721",
                "revision": 0
            }
        }, {
            "id": "RWri-MEl-5a8009a00000bca80137ef95bc3f643f-MEl-5a844d820000bca8013750b9a0410b6b",
            "title": "writes",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Writing",
            "subject": {
                "id": "MEl-5a8009a00000bca80137ef95bc3f643f",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a844d820000bca8013750b9a0410b6b",
                "revision": 0
            }
        }, {
            "id": "RWri-MEl-5a8009a00000bca80137ef95bc3f643f-MEl-5a82ec6f0000bca801372ef053a71bdf",
            "title": "writes",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Writing",
            "subject": {
                "id": "MEl-5a8009a00000bca80137ef95bc3f643f",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a82ec6f0000bca801372ef053a71bdf",
                "revision": 0
            }
        }, {
            "id": "RWri-MEl-5a8009a00000bca80137ef95bc3f643f-MEl-5a820a3c0000bca801378c9093fb7d80",
            "title": "writes",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Writing",
            "subject": {
                "id": "MEl-5a8009a00000bca80137ef95bc3f643f",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a820a3c0000bca801378c9093fb7d80",
                "revision": 0
            }
        }, {
            "id": "RCtn-MEl-5a47935a0000bca801377c17f8cb25b0-MEl-608239830000bca801373690c7d2af0f",
            "title": "contains",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Containment",
            "subject": {
                "id": "MEl-5a47935a0000bca801377c17f8cb25b0",
                "revision": 0
            },
            "object": {
                "id": "MEl-608239830000bca801373690c7d2af0f",
                "revision": 0
            }
        }, {
            "id": "RCtn-MEl-5a47935a0000bca801377c17f8cb25b0-MEl-610b07100000bca80137c10f96c46247",
            "title": "contains",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Containment",
            "subject": {
                "id": "MEl-5a47935a0000bca801377c17f8cb25b0",
                "revision": 0
            },
            "object": {
                "id": "MEl-610b07100000bca80137c10f96c46247",
                "revision": 0
            }
        }, {
            "id": "RCtn-MEl-5a47935a0000bca801377c17f8cb25b0-MEl-610e0b010000bca80137ac40800bb1b8",
            "title": "contains",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Containment",
            "subject": {
                "id": "MEl-5a47935a0000bca801377c17f8cb25b0",
                "revision": 0
            },
            "object": {
                "id": "MEl-610e0b010000bca80137ac40800bb1b8",
                "revision": 0
            }
        }, {
            "id": "RRea-MEl-5bcfb01d0000bca80137f303272a5557-MEl-5a52b50c0000bca801377e3d15255f98",
            "title": "reads",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Reading",
            "subject": {
                "id": "MEl-5bcfb01d0000bca80137f303272a5557",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a52b50c0000bca801377e3d15255f98",
                "revision": 0
            }
        }, {
            "id": "RWri-MEl-5a50d5b60000bca8013781532547ce93-MEl-5a489c300000bca80137ee1373c16844",
            "title": "writes",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Writing",
            "subject": {
                "id": "MEl-5a50d5b60000bca8013781532547ce93",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a489c300000bca80137ee1373c16844",
                "revision": 0
            }
        }, {
            "id": "RRea-MEl-5a50d5b60000bca8013781532547ce93-MEl-5a489c300000bca80137ee1373c16844",
            "title": "reads",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Reading",
            "subject": {
                "id": "MEl-5a50d5b60000bca8013781532547ce93",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a489c300000bca80137ee1373c16844",
                "revision": 0
            }
        }, {
            "id": "RWri-MEl-5a50d5b60000bca8013781532547ce93-MEl-5a52b50c0000bca801377e3d15255f98",
            "title": "writes",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Writing",
            "subject": {
                "id": "MEl-5a50d5b60000bca8013781532547ce93",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a52b50c0000bca801377e3d15255f98",
                "revision": 0
            }
        }, {
            "id": "RRea-MEl-5a50d5b60000bca8013781532547ce93-MEl-5a4c80c20000bca8013753b6999a4da8",
            "title": "reads",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Reading",
            "subject": {
                "id": "MEl-5a50d5b60000bca8013781532547ce93",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a4c80c20000bca8013753b6999a4da8",
                "revision": 0
            }
        }, {
            "id": "RRea-MEl-5a50d5b60000bca8013781532547ce93-MEl-5a51dd920000bca8013770a4395c83fc",
            "title": "reads",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Reading",
            "subject": {
                "id": "MEl-5a50d5b60000bca8013781532547ce93",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a51dd920000bca8013770a4395c83fc",
                "revision": 0
            }
        }, {
            "id": "RCtn-MEl-803fd3750000c3a8013cf1fdb3b26d33-MEl-5a50d5b60000bca8013781532547ce93",
            "title": "contains",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Containment",
            "subject": {
                "id": "MEl-803fd3750000c3a8013cf1fdb3b26d33",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a50d5b60000bca8013781532547ce93",
                "revision": 0
            }
        }, {
            "id": "RCtn-MEl-5a47935a0000bca801377c17f8cb25b0-MEl-453862540000c3a801419d91bef48cfd",
            "title": "contains",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Containment",
            "subject": {
                "id": "MEl-5a47935a0000bca801377c17f8cb25b0",
                "revision": 0
            },
            "object": {
                "id": "MEl-453862540000c3a801419d91bef48cfd",
                "revision": 0
            }
        }, {
            "id": "RCtn-MEl-5a47935a0000bca801377c17f8cb25b0-MEl-45387c0b0000c3a801410aa03f6b9be4",
            "title": "contains",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Containment",
            "subject": {
                "id": "MEl-5a47935a0000bca801377c17f8cb25b0",
                "revision": 0
            },
            "object": {
                "id": "MEl-45387c0b0000c3a801410aa03f6b9be4",
                "revision": 0
            }
        }, {
            "id": "RCtn-MEl-5a47935a0000bca801377c17f8cb25b0-MEl-4538920b0000c3a801415c67e334b8a1",
            "title": "contains",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Containment",
            "subject": {
                "id": "MEl-5a47935a0000bca801377c17f8cb25b0",
                "revision": 0
            },
            "object": {
                "id": "MEl-4538920b0000c3a801415c67e334b8a1",
                "revision": 0
            }
        }, {
            "id": "RCtn-MEl-5a47935a0000bca801377c17f8cb25b0-MEl-459b92580000c3a80141cb4acb521ab1",
            "title": "contains",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Containment",
            "subject": {
                "id": "MEl-5a47935a0000bca801377c17f8cb25b0",
                "revision": 0
            },
            "object": {
                "id": "MEl-459b92580000c3a80141cb4acb521ab1",
                "revision": 0
            }
        }, {
            "id": "RCtn-MEl-5a47935a0000bca801377c17f8cb25b0-MEl-45384cd10000c3a80141c1f85d7c26e6",
            "title": "contains",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Containment",
            "subject": {
                "id": "MEl-5a47935a0000bca801377c17f8cb25b0",
                "revision": 0
            },
            "object": {
                "id": "MEl-45384cd10000c3a80141c1f85d7c26e6",
                "revision": 0
            }
        }, {
            "id": "RCtn-MEl-5a47935a0000bca801377c17f8cb25b0-MEl-607f13b50000bca80137ba95f11856ab",
            "title": "contains",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Containment",
            "subject": {
                "id": "MEl-5a47935a0000bca801377c17f8cb25b0",
                "revision": 0
            },
            "object": {
                "id": "MEl-607f13b50000bca80137ba95f11856ab",
                "revision": 0
            }
        }, {
            "id": "RWri-MEl-5a47935a0000bca801377c17f8cb25b0-MEl-5a489c300000bca80137ee1373c16844",
            "title": "writes",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Writing",
            "subject": {
                "id": "MEl-5a47935a0000bca801377c17f8cb25b0",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a489c300000bca80137ee1373c16844",
                "revision": 0
            }
        }, {
            "id": "RWri-MEl-5a47935a0000bca801377c17f8cb25b0-MEl-5a4c80c20000bca8013753b6999a4da8",
            "title": "writes",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Writing",
            "subject": {
                "id": "MEl-5a47935a0000bca801377c17f8cb25b0",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a4c80c20000bca8013753b6999a4da8",
                "revision": 0
            }
        }, {
            "id": "RWri-MEl-5a47935a0000bca801377c17f8cb25b0-MEl-5a51dd920000bca8013770a4395c83fc",
            "title": "writes",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Writing",
            "subject": {
                "id": "MEl-5a47935a0000bca801377c17f8cb25b0",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a51dd920000bca8013770a4395c83fc",
                "revision": 0
            }
        }, {
            "id": "RCtn-MEl-5a489c300000bca80137ee1373c16844-MEl-5a9b7a9b0000bca80137d768644696b7",
            "title": "contains",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Containment",
            "subject": {
                "id": "MEl-5a489c300000bca80137ee1373c16844",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a9b7a9b0000bca80137d768644696b7",
                "revision": 0
            }
        }, {
            "id": "RWri-MEl-5a9b7a9b0000bca80137d768644696b7-MEl-5a77385f0000bca80137e1c7dc0b1721",
            "title": "writes",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Writing",
            "subject": {
                "id": "MEl-5a9b7a9b0000bca80137d768644696b7",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a77385f0000bca80137e1c7dc0b1721",
                "revision": 0
            }
        }, {
            "id": "RRea-MEl-5a9b7a9b0000bca80137d768644696b7-MEl-5a77385f0000bca80137e1c7dc0b1721",
            "title": "reads",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Reading",
            "subject": {
                "id": "MEl-5a9b7a9b0000bca80137d768644696b7",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a77385f0000bca80137e1c7dc0b1721",
                "revision": 0
            }
        }, {
            "id": "RWri-MEl-5a9b7a9b0000bca80137d768644696b7-MEl-463289cd0000c3a80141be3fc417034a",
            "title": "writes",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Writing",
            "subject": {
                "id": "MEl-5a9b7a9b0000bca80137d768644696b7",
                "revision": 0
            },
            "object": {
                "id": "MEl-463289cd0000c3a80141be3fc417034a",
                "revision": 0
            }
        }, {
            "id": "RRea-MEl-5a9b7a9b0000bca80137d768644696b7-MEl-463289cd0000c3a80141be3fc417034a",
            "title": "reads",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Reading",
            "subject": {
                "id": "MEl-5a9b7a9b0000bca80137d768644696b7",
                "revision": 0
            },
            "object": {
                "id": "MEl-463289cd0000c3a80141be3fc417034a",
                "revision": 0
            }
        }, {
            "id": "RWri-MEl-5a9b7a9b0000bca80137d768644696b7-MEl-5a9ce0310000bca801378176dc4744e8",
            "title": "writes",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Writing",
            "subject": {
                "id": "MEl-5a9b7a9b0000bca80137d768644696b7",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a9ce0310000bca801378176dc4744e8",
                "revision": 0
            }
        }, {
            "id": "RRea-MEl-5a9b7a9b0000bca80137d768644696b7-MEl-5a7776c50000bca8013765ae93af9209",
            "title": "reads",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Reading",
            "subject": {
                "id": "MEl-5a9b7a9b0000bca80137d768644696b7",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a7776c50000bca8013765ae93af9209",
                "revision": 0
            }
        }, {
            "id": "RCtn-MEl-5a489c300000bca80137ee1373c16844-MEl-5a7776c50000bca8013765ae93af9209",
            "title": "contains",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Containment",
            "subject": {
                "id": "MEl-5a489c300000bca80137ee1373c16844",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a7776c50000bca8013765ae93af9209",
                "revision": 0
            }
        }, {
            "id": "RCtn-MEl-5a489c300000bca80137ee1373c16844-MEl-5a9ce0310000bca801378176dc4744e8",
            "title": "contains",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Containment",
            "subject": {
                "id": "MEl-5a489c300000bca80137ee1373c16844",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a9ce0310000bca801378176dc4744e8",
                "revision": 0
            }
        }, {
            "id": "RCtn-MEl-5a489c300000bca80137ee1373c16844-MEl-5a4dd77b0000bca8013736c6912ad291",
            "title": "contains",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Containment",
            "subject": {
                "id": "MEl-5a489c300000bca80137ee1373c16844",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a4dd77b0000bca8013736c6912ad291",
                "revision": 0
            }
        }, {
            "id": "RCtn-MEl-5a4c80c20000bca8013753b6999a4da8-MEl-5a4dd77b0000bca8013736c6912ad291",
            "title": "contains",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Containment",
            "subject": {
                "id": "MEl-5a4c80c20000bca8013753b6999a4da8",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a4dd77b0000bca8013736c6912ad291",
                "revision": 0
            }
        }, {
            "id": "RCtn-MEl-5a51dd920000bca8013770a4395c83fc-MEl-5a4dd77b0000bca8013736c6912ad291",
            "title": "contains",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Containment",
            "subject": {
                "id": "MEl-5a51dd920000bca8013770a4395c83fc",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a4dd77b0000bca8013736c6912ad291",
                "revision": 0
            }
        }, {
            "id": "RCtn-MEl-5a489c300000bca80137ee1373c16844-MEl-5a77385f0000bca80137e1c7dc0b1721",
            "title": "contains",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Containment",
            "subject": {
                "id": "MEl-5a489c300000bca80137ee1373c16844",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a77385f0000bca80137e1c7dc0b1721",
                "revision": 0
            }
        }, {
            "id": "RCtn-MEl-5a489c300000bca80137ee1373c16844-MEl-5a4d6dee0000bca80137c1caf2f42349",
            "title": "contains",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Containment",
            "subject": {
                "id": "MEl-5a489c300000bca80137ee1373c16844",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a4d6dee0000bca80137c1caf2f42349",
                "revision": 0
            }
        }, {
            "id": "RCtn-MEl-803fd3750000c3a8013cf1fdb3b26d33-MEl-5a489c300000bca80137ee1373c16844",
            "title": "contains",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Containment",
            "subject": {
                "id": "MEl-803fd3750000c3a8013cf1fdb3b26d33",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a489c300000bca80137ee1373c16844",
                "revision": 0
            }
        }, {
            "id": "RCtn-MEl-5a4c80c20000bca8013753b6999a4da8-MEl-5a4cfa830000bca801370d837f761f3e",
            "title": "contains",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Containment",
            "subject": {
                "id": "MEl-5a4c80c20000bca8013753b6999a4da8",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a4cfa830000bca801370d837f761f3e",
                "revision": 0
            }
        }, {
            "id": "RCtn-MEl-5a4c80c20000bca8013753b6999a4da8-MEl-5a4d2bd00000bca80137a3f233cdffeb",
            "title": "contains",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Containment",
            "subject": {
                "id": "MEl-5a4c80c20000bca8013753b6999a4da8",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a4d2bd00000bca80137a3f233cdffeb",
                "revision": 0
            }
        }, {
            "id": "RCtn-MEl-5a4c80c20000bca8013753b6999a4da8-MEl-5a4d6dee0000bca80137c1caf2f42349",
            "title": "contains",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Containment",
            "subject": {
                "id": "MEl-5a4c80c20000bca8013753b6999a4da8",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a4d6dee0000bca80137c1caf2f42349",
                "revision": 0
            }
        }, {
            "id": "RCtn-MEl-803fd3750000c3a8013cf1fdb3b26d33-MEl-5a4c80c20000bca8013753b6999a4da8",
            "title": "contains",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Containment",
            "subject": {
                "id": "MEl-803fd3750000c3a8013cf1fdb3b26d33",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a4c80c20000bca8013753b6999a4da8",
                "revision": 0
            }
        }, {
            "id": "RCtn-MEl-5a52b50c0000bca801377e3d15255f98-MEl-5bcf35cf0000bca8013776d68023612a",
            "title": "contains",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Containment",
            "subject": {
                "id": "MEl-5a52b50c0000bca801377e3d15255f98",
                "revision": 0
            },
            "object": {
                "id": "MEl-5bcf35cf0000bca8013776d68023612a",
                "revision": 0
            }
        }, {
            "id": "RCtn-MEl-803fd3750000c3a8013cf1fdb3b26d33-MEl-5a52b50c0000bca801377e3d15255f98",
            "title": "contains",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Containment",
            "subject": {
                "id": "MEl-803fd3750000c3a8013cf1fdb3b26d33",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a52b50c0000bca801377e3d15255f98",
                "revision": 0
            }
        }, {
            "id": "RCtn-MEl-5a51dd920000bca8013770a4395c83fc-MEl-5a4d6dee0000bca80137c1caf2f42349",
            "title": "contains",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Containment",
            "subject": {
                "id": "MEl-5a51dd920000bca8013770a4395c83fc",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a4d6dee0000bca80137c1caf2f42349",
                "revision": 0
            }
        }, {
            "id": "RCtn-MEl-803fd3750000c3a8013cf1fdb3b26d33-MEl-5a51dd920000bca8013770a4395c83fc",
            "title": "contains",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "RT-Containment",
            "subject": {
                "id": "MEl-803fd3750000c3a8013cf1fdb3b26d33",
                "revision": 0
            },
            "object": {
                "id": "MEl-5a51dd920000bca8013770a4395c83fc",
                "revision": 0
            }
        }],
        "hierarchies": [{
            "id": "SP-59c8a7730000bca80137509a49b1218b",
            "title": "Dimmer - Semantically Integrated Specification (2016-05-12)",
            "description": "This is the root node of a project hierarchy (tree)",
            "revision": 1,
            "changedAt": "2016-05-26T08:59:00+02:00",
            "class": "ST-ACProject",
            "nodes": [{
                "id": "SH-Fld-59c8a7730000bca80137509a49b1218b-info",
                "resource": "Fld-59c8a7730000bca80137509a49b1218b-info",
                "nodes": [],
                "revision": 1,
                "changedAt": "2016-05-26T08:59:00+02:00"
            }, {
                "id": "SH-Fld-5a5f54090000bca801375b04a668f1a7",
                "resource": "Fld-5a5f54090000bca801375b04a668f1a7",
                "nodes": [{
                    "id": "SH-Pln-27420ffc0000c3a8013ab527ca1b71f5",
                    "resource": "Pln-27420ffc0000c3a8013ab527ca1b71f5",
                    "nodes": [],
                    "revision": 1,
                    "changedAt": "2016-05-26T08:59:00+02:00"
                }, {
                    "id": "SH-Pln-5a4755dd0000bca801375293a62c90a8",
                    "resource": "Pln-5a4755dd0000bca801375293a62c90a8",
                    "nodes": [],
                    "revision": 1,
                    "changedAt": "2016-05-26T08:59:00+02:00"
                }, {
                    "id": "SH-Pln-5a6cdea50000bca80137d6b2d6e8a3a0",
                    "resource": "Pln-5a6cdea50000bca80137d6b2d6e8a3a0",
                    "nodes": [],
                    "revision": 1,
                    "changedAt": "2016-05-26T08:59:00+02:00"
                }, {
                    "id": "SH-Pln-5a7f99af0000bca8013754f2ef12d3e5",
                    "resource": "Pln-5a7f99af0000bca8013754f2ef12d3e5",
                    "nodes": [],
                    "revision": 1,
                    "changedAt": "2016-05-26T08:59:00+02:00"
                }],
                "revision": 1,
                "changedAt": "2016-05-26T08:59:00+02:00"
            }, {
                "id": "SH-Fld-5af3154d0000bca801379748537d7388",
                "resource": "Fld-5af3154d0000bca801379748537d7388",
                "nodes": [{
                    "id": "SH-Fld-5b6a99f10000bca80137b78cda65fc07",
                    "resource": "Fld-5b6a99f10000bca80137b78cda65fc07",
                    "nodes": [{
                        "id": "SH-Pln-606e76c70000bca801376ec3133a1181",
                        "resource": "Pln-606e76c70000bca801376ec3133a1181",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2016-05-26T08:59:00+02:00"
                    }, {
                        "id": "SH-Pln-45a1c8930000c3a801414cd1eaa70b5a",
                        "resource": "Pln-45a1c8930000c3a801414cd1eaa70b5a",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2016-05-26T08:59:00+02:00"
                    }, {
                        "id": "SH-Pln-5af364560000bca80137b84017f4e832",
                        "resource": "Pln-5af364560000bca80137b84017f4e832",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2016-05-26T08:59:00+02:00"
                    }],
                    "revision": 1,
                    "changedAt": "2016-05-26T08:59:00+02:00"
                }],
                "revision": 1,
                "changedAt": "2016-05-26T08:59:00+02:00"
            }, {
                "id": "SH-Fld-5b8e98550000bca801371afb0c7b671b",
                "resource": "Fld-5b8e98550000bca801371afb0c7b671b",
                "nodes": [{
                    "id": "SH-Fld-d1b1698a0000c3a801505b1b5698b7a1",
                    "resource": "Fld-d1b1698a0000c3a801505b1b5698b7a1",
                    "nodes": [{
                        "id": "SH-Req-d1c895230000c3a80150f8afd049f738",
                        "resource": "Req-d1c895230000c3a80150f8afd049f738",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2016-05-26T08:59:00+02:00"
                    }, {
                        "id": "SH-Req-d1d42a6a0000c3a8015091ec8d149b93",
                        "resource": "Req-d1d42a6a0000c3a8015091ec8d149b93",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2016-05-26T08:59:00+02:00"
                    }, {
                        "id": "SH-Req-d1cd7f370000c3a8015095e6ee21aab7",
                        "resource": "Req-d1cd7f370000c3a8015095e6ee21aab7",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2016-05-26T08:59:00+02:00"
                    }, {
                        "id": "SH-Req-5ba3512b0000bca801371cc0617eb4c1",
                        "resource": "Req-5ba3512b0000bca801371cc0617eb4c1",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2016-05-26T08:59:00+02:00"
                    }, {
                        "id": "SH-Req-5b8fbb300000bca80137c73e3ce4c737",
                        "resource": "Req-5b8fbb300000bca80137c73e3ce4c737",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2016-05-26T08:59:00+02:00"
                    }],
                    "revision": 1,
                    "changedAt": "2016-05-26T08:59:00+02:00"
                }, {
                    "id": "SH-Fld-d1b1d6c60000c3a80150fe9ce40e6588",
                    "resource": "Fld-d1b1d6c60000c3a80150fe9ce40e6588",
                    "nodes": [{
                        "id": "SH-Req-5b944fc70000bca8013763f44fdc0e03",
                        "resource": "Req-5b944fc70000bca8013763f44fdc0e03",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2016-05-26T08:59:00+02:00"
                    }, {
                        "id": "SH-Req-5ba140d60000bca801372b09f9888eca",
                        "resource": "Req-5ba140d60000bca801372b09f9888eca",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2016-05-26T08:59:00+02:00"
                    }, {
                        "id": "SH-Req-ee452cf20000c3a8014035290669304d",
                        "resource": "Req-ee452cf20000c3a8014035290669304d",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2016-05-26T08:59:00+02:00"
                    }, {
                        "id": "SH-Req-ee43fc4c0000c3a8014063d42c77767f",
                        "resource": "Req-ee43fc4c0000c3a8014063d42c77767f",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2016-05-26T08:59:00+02:00"
                    }, {
                        "id": "SH-Req-5b9124bc0000bca80137fa2ce86f5eca",
                        "resource": "Req-5b9124bc0000bca80137fa2ce86f5eca",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2016-05-26T08:59:00+02:00"
                    }, {
                        "id": "SH-Req-5b9e68530000bca801371362c49d2d08",
                        "resource": "Req-5b9e68530000bca801371362c49d2d08",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2016-05-26T08:59:00+02:00"
                    }],
                    "revision": 1,
                    "changedAt": "2016-05-26T08:59:00+02:00"
                }, {
                    "id": "SH-Fld-d1b314890000c3a80150b71a1473d374",
                    "resource": "Fld-d1b314890000c3a80150b71a1473d374",
                    "nodes": [{
                        "id": "SH-Req-eea1cd500000c3a80140fe00109eb7f4",
                        "resource": "Req-eea1cd500000c3a80140fe00109eb7f4",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2016-05-26T08:59:00+02:00"
                    }, {
                        "id": "SH-Req-5b95fae40000bca801372becc933682d",
                        "resource": "Req-5b95fae40000bca801372becc933682d",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2016-05-26T08:59:00+02:00"
                    }, {
                        "id": "SH-Req-5b9ab8a50000bca801377ad0be3bbc89",
                        "resource": "Req-5b9ab8a50000bca801377ad0be3bbc89",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2016-05-26T08:59:00+02:00"
                    }, {
                        "id": "SH-Req-728c69c80018b1a8014b974542c36edc",
                        "resource": "Req-728c69c80018b1a8014b974542c36edc",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2016-05-26T08:59:00+02:00"
                    }, {
                        "id": "SH-Req-5b9c950e0000bca801374f16615247b9",
                        "resource": "Req-5b9c950e0000bca801374f16615247b9",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2016-05-26T08:59:00+02:00"
                    }],
                    "revision": 1,
                    "changedAt": "2016-05-26T08:59:00+02:00"
                }],
                "revision": 1,
                "changedAt": "2016-05-26T08:59:00+02:00"
            }, {
                "id": "SH-Fld-ef47e6970000c3a80139dc747c5df319",
                "resource": "Fld-ef47e6970000c3a80139dc747c5df319",
                "nodes": [{
                    "id": "SH-Fld-ee29463e0000c3a80139627bbced50ae",
                    "resource": "Fld-ee29463e0000c3a80139627bbced50ae",
                    "nodes": [{
                        "id": "SH-Iss-ee2abb630000c3a8013987a750219659",
                        "resource": "Iss-ee2abb630000c3a8013987a750219659",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2016-05-26T08:59:00+02:00"
                    }],
                    "revision": 1,
                    "changedAt": "2016-05-26T08:59:00+02:00"
                }, {
                    "id": "SH-Fld-ee2a15040000c3a80139d27de6704f15",
                    "resource": "Fld-ee2a15040000c3a80139d27de6704f15",
                    "nodes": [{
                        "id": "SH-Iss-eee2d4e00000c3a801394148dcc58a52",
                        "resource": "Iss-eee2d4e00000c3a801394148dcc58a52",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2016-05-26T08:59:00+02:00"
                    }],
                    "revision": 1,
                    "changedAt": "2016-05-26T08:59:00+02:00"
                }],
                "revision": 1,
                "changedAt": "2016-05-26T08:59:00+02:00"
            }, {
                "id": "SH-Fld-59c8a7730000bca80137509a49b1218b-glossary",
                "resource": "Fld-59c8a7730000bca80137509a49b1218b-glossary",
                "nodes": [{
                    "id": "SH-Fld-59c8a7730000bca80137509a49b1218b-Act",
                    "resource": "Fld-59c8a7730000bca80137509a49b1218b-Act",
                    "nodes": [{
                        "id": "SH-MEl-5a76365c0000bca8013776e91afd1e8e",
                        "resource": "MEl-5a76365c0000bca8013776e91afd1e8e",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2012-05-17T17:17:00+02:00"
                    }, {
                        "id": "SH-MEl-608177820000bca801379179ebf3b6aa",
                        "resource": "MEl-608177820000bca801379179ebf3b6aa",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2013-09-22T14:11:00+02:00"
                    }, {
                        "id": "SH-MEl-611366530000bca80137a97f194e96a3",
                        "resource": "MEl-611366530000bca80137a97f194e96a3",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2013-09-22T14:11:00+02:00"
                    }, {
                        "id": "SH-MEl-5bd6bd890000bca8013739588a3f43d6",
                        "resource": "MEl-5bd6bd890000bca8013739588a3f43d6",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2012-05-17T19:30:00+02:00"
                    }, {
                        "id": "SH-MEl-5a85347c0000bca80137ad485c7cd330",
                        "resource": "MEl-5a85347c0000bca80137ad485c7cd330",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2014-06-26T15:17:00+02:00"
                    }, {
                        "id": "SH-MEl-5a808e2a0000bca80137bfd74268a84a",
                        "resource": "MEl-5a808e2a0000bca80137bfd74268a84a",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2015-02-10T08:58:00+01:00"
                    }, {
                        "id": "SH-MEl-5a752ccc0000bca80137479a2e8bab30",
                        "resource": "MEl-5a752ccc0000bca80137479a2e8bab30",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2013-09-22T00:09:00+02:00"
                    }, {
                        "id": "SH-MEl-5a71c4800000bca80137f2aaa7b63000",
                        "resource": "MEl-5a71c4800000bca80137f2aaa7b63000",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2013-09-22T00:10:00+02:00"
                    }, {
                        "id": "SH-MEl-606f16ac0000bca801373587fda932b3",
                        "resource": "MEl-606f16ac0000bca801373587fda932b3",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2014-06-26T15:12:00+02:00"
                    }, {
                        "id": "SH-MEl-5a8009a00000bca80137ef95bc3f643f",
                        "resource": "MEl-5a8009a00000bca80137ef95bc3f643f",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2015-02-10T08:58:00+01:00"
                    }, {
                        "id": "SH-MEl-608239830000bca801373690c7d2af0f",
                        "resource": "MEl-608239830000bca801373690c7d2af0f",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2013-09-22T14:11:00+02:00"
                    }, {
                        "id": "SH-MEl-610b07100000bca80137c10f96c46247",
                        "resource": "MEl-610b07100000bca80137c10f96c46247",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2013-09-22T14:11:00+02:00"
                    }, {
                        "id": "SH-MEl-610e0b010000bca80137ac40800bb1b8",
                        "resource": "MEl-610e0b010000bca80137ac40800bb1b8",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2012-05-18T19:45:00+02:00"
                    }, {
                        "id": "SH-MEl-5bcfb01d0000bca80137f303272a5557",
                        "resource": "MEl-5bcfb01d0000bca80137f303272a5557",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2015-11-08T23:36:00+01:00"
                    }, {
                        "id": "SH-MEl-5a50d5b60000bca8013781532547ce93",
                        "resource": "MEl-5a50d5b60000bca8013781532547ce93",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2012-10-03T17:46:00+02:00"
                    }, {
                        "id": "SH-MEl-5b2d29070000bca801378a6c020cf8f5",
                        "resource": "MEl-5b2d29070000bca801378a6c020cf8f5",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2012-05-17T16:35:00+02:00"
                    }, {
                        "id": "SH-MEl-5b1750f80000bca801373b2d143d7478",
                        "resource": "MEl-5b1750f80000bca801373b2d143d7478",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2012-05-17T16:36:00+02:00"
                    }, {
                        "id": "SH-MEl-5b2ddad80000bca80137c44d62ba97d8",
                        "resource": "MEl-5b2ddad80000bca80137c44d62ba97d8",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2012-05-17T16:35:00+02:00"
                    }, {
                        "id": "SH-MEl-5b2449180000bca8013722c01c9d35a5",
                        "resource": "MEl-5b2449180000bca8013722c01c9d35a5",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2012-05-17T16:36:00+02:00"
                    }, {
                        "id": "SH-MEl-5b0839b90000bca801376dcca41ca7d0",
                        "resource": "MEl-5b0839b90000bca801376dcca41ca7d0",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2012-05-17T18:06:00+02:00"
                    }, {
                        "id": "SH-MEl-5b07e6aa0000bca8013797aad9be69ae",
                        "resource": "MEl-5b07e6aa0000bca8013797aad9be69ae",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2012-05-17T15:53:00+02:00"
                    }, {
                        "id": "SH-MEl-5a47935a0000bca801377c17f8cb25b0",
                        "resource": "MEl-5a47935a0000bca801377c17f8cb25b0",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2012-05-17T19:38:00+02:00"
                    }, {
                        "id": "SH-MEl-45a236e00000c3a801410f6503287e16",
                        "resource": "MEl-45a236e00000c3a801410f6503287e16",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2013-09-22T14:48:00+02:00"
                    }, {
                        "id": "SH-MEl-45a3b13c0000c3a801415e97f5bc29d1",
                        "resource": "MEl-45a3b13c0000c3a801415e97f5bc29d1",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2013-09-22T14:48:00+02:00"
                    }, {
                        "id": "SH-MEl-5a9b7a9b0000bca80137d768644696b7",
                        "resource": "MEl-5a9b7a9b0000bca80137d768644696b7",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2013-09-22T00:09:00+02:00"
                    }],
                    "revision": 1,
                    "changedAt": "2016-05-26T08:59:00+02:00"
                }, {
                    "id": "SH-Fld-59c8a7730000bca80137509a49b1218b-Sta",
                    "resource": "Fld-59c8a7730000bca80137509a49b1218b-Sta",
                    "nodes": [{
                        "id": "SH-MEl-5a7776c50000bca8013765ae93af9209",
                        "resource": "MEl-5a7776c50000bca8013765ae93af9209",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2013-09-22T00:12:00+02:00"
                    }, {
                        "id": "SH-MEl-5a9ce0310000bca801378176dc4744e8",
                        "resource": "MEl-5a9ce0310000bca801378176dc4744e8",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2014-06-27T02:24:00+02:00"
                    }, {
                        "id": "SH-MEl-5a4dd77b0000bca8013736c6912ad291",
                        "resource": "MEl-5a4dd77b0000bca8013736c6912ad291",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2015-11-15T13:54:00+01:00"
                    }, {
                        "id": "SH-MEl-5a844d820000bca8013750b9a0410b6b",
                        "resource": "MEl-5a844d820000bca8013750b9a0410b6b",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2013-09-22T00:03:00+02:00"
                    }, {
                        "id": "SH-MEl-5a489c300000bca80137ee1373c16844",
                        "resource": "MEl-5a489c300000bca80137ee1373c16844",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2012-05-17T17:11:00+02:00"
                    }, {
                        "id": "SH-MEl-5a4c80c20000bca8013753b6999a4da8",
                        "resource": "MEl-5a4c80c20000bca8013753b6999a4da8",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2012-05-18T20:53:00+02:00"
                    }, {
                        "id": "SH-MEl-5a99c89c0000bca801375d44cf9a50ca",
                        "resource": "MEl-5a99c89c0000bca801375d44cf9a50ca",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2013-09-22T00:16:00+02:00"
                    }, {
                        "id": "SH-MEl-5a87083e0000bca801379bb412523737",
                        "resource": "MEl-5a87083e0000bca801379bb412523737",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2014-06-27T02:26:00+02:00"
                    }, {
                        "id": "SH-MEl-5a52b50c0000bca801377e3d15255f98",
                        "resource": "MEl-5a52b50c0000bca801377e3d15255f98",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2012-05-17T19:18:00+02:00"
                    }, {
                        "id": "SH-MEl-5a9929510000bca80137d23c81f1ca54",
                        "resource": "MEl-5a9929510000bca80137d23c81f1ca54",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2013-09-22T00:15:00+02:00"
                    }, {
                        "id": "SH-MEl-5bcf35cf0000bca8013776d68023612a",
                        "resource": "MEl-5bcf35cf0000bca8013776d68023612a",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2012-05-17T19:25:00+02:00"
                    }, {
                        "id": "SH-MEl-5c29fb8e0000bca80137eb9734c99bfd",
                        "resource": "MEl-5c29fb8e0000bca80137eb9734c99bfd",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2013-09-22T00:15:00+02:00"
                    }, {
                        "id": "SH-MEl-5a82ec6f0000bca801372ef053a71bdf",
                        "resource": "MEl-5a82ec6f0000bca801372ef053a71bdf",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2013-09-22T00:03:00+02:00"
                    }, {
                        "id": "SH-MEl-5a86b8980000bca80137ca6fde1a125e",
                        "resource": "MEl-5a86b8980000bca80137ca6fde1a125e",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2013-09-22T00:04:00+02:00"
                    }, {
                        "id": "SH-MEl-5a51dd920000bca8013770a4395c83fc",
                        "resource": "MEl-5a51dd920000bca8013770a4395c83fc",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2012-05-17T16:59:00+02:00"
                    }, {
                        "id": "SH-MEl-803fd3750000c3a8013cf1fdb3b26d33",
                        "resource": "MEl-803fd3750000c3a8013cf1fdb3b26d33",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2013-01-28T09:28:00+01:00"
                    }, {
                        "id": "SH-MEl-5a77385f0000bca80137e1c7dc0b1721",
                        "resource": "MEl-5a77385f0000bca80137e1c7dc0b1721",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2013-09-22T00:12:00+02:00"
                    }, {
                        "id": "SH-MEl-5a4cfa830000bca801370d837f761f3e",
                        "resource": "MEl-5a4cfa830000bca801370d837f761f3e",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2015-11-08T23:38:00+01:00"
                    }, {
                        "id": "SH-MEl-5a9888810000bca801375410ce1cc142",
                        "resource": "MEl-5a9888810000bca801375410ce1cc142",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2013-09-22T00:15:00+02:00"
                    }, {
                        "id": "SH-MEl-5a820a3c0000bca801378c9093fb7d80",
                        "resource": "MEl-5a820a3c0000bca801378c9093fb7d80",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2013-09-22T00:02:00+02:00"
                    }, {
                        "id": "SH-MEl-5a4d2bd00000bca80137a3f233cdffeb",
                        "resource": "MEl-5a4d2bd00000bca80137a3f233cdffeb",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2015-11-08T23:38:00+01:00"
                    }, {
                        "id": "SH-MEl-5a4d6dee0000bca80137c1caf2f42349",
                        "resource": "MEl-5a4d6dee0000bca80137c1caf2f42349",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2015-11-15T13:54:00+01:00"
                    }, {
                        "id": "SH-MEl-463289cd0000c3a80141be3fc417034a",
                        "resource": "MEl-463289cd0000c3a80141be3fc417034a",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2014-03-29T16:30:00+01:00"
                    }],
                    "revision": 1,
                    "changedAt": "2016-05-26T08:59:00+02:00"
                }, {
                    "id": "SH-Fld-59c8a7730000bca80137509a49b1218b-Evt",
                    "resource": "Fld-59c8a7730000bca80137509a49b1218b-Evt",
                    "nodes": [{
                        "id": "SH-MEl-5b2f95ec0000bca8013709bfa81d701f",
                        "resource": "MEl-5b2f95ec0000bca8013709bfa81d701f",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2012-05-17T16:24:00+02:00"
                    }, {
                        "id": "SH-MEl-453862540000c3a801419d91bef48cfd",
                        "resource": "MEl-453862540000c3a801419d91bef48cfd",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2013-09-22T12:30:00+02:00"
                    }, {
                        "id": "SH-MEl-45387c0b0000c3a801410aa03f6b9be4",
                        "resource": "MEl-45387c0b0000c3a801410aa03f6b9be4",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2013-09-22T12:30:00+02:00"
                    }, {
                        "id": "SH-MEl-4538920b0000c3a801415c67e334b8a1",
                        "resource": "MEl-4538920b0000c3a801415c67e334b8a1",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2013-09-22T12:30:00+02:00"
                    }, {
                        "id": "SH-MEl-45450be80000c3a801414f280f146c71",
                        "resource": "MEl-45450be80000c3a801414f280f146c71",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2013-09-22T12:44:00+02:00"
                    }, {
                        "id": "SH-MEl-4536b0350000c3a801415986f8ea806a",
                        "resource": "MEl-4536b0350000c3a801415986f8ea806a",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2013-09-22T12:33:00+02:00"
                    }, {
                        "id": "SH-MEl-5b149eab0000bca80137aad99b6eea7b",
                        "resource": "MEl-5b149eab0000bca80137aad99b6eea7b",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2012-05-17T15:55:00+02:00"
                    }, {
                        "id": "SH-MEl-5b08ed8d0000bca8013719f554353b0e",
                        "resource": "MEl-5b08ed8d0000bca8013719f554353b0e",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2012-05-17T15:51:00+02:00"
                    }, {
                        "id": "SH-MEl-453dfb670000c3a8014191107df4565e",
                        "resource": "MEl-453dfb670000c3a8014191107df4565e",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2013-09-22T12:36:00+02:00"
                    }, {
                        "id": "SH-MEl-5b094f8a0000bca801374c798a6587ad",
                        "resource": "MEl-5b094f8a0000bca801374c798a6587ad",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2012-05-17T15:42:00+02:00"
                    }, {
                        "id": "SH-MEl-45428b930000c3a80141e28b7d4b5ae5",
                        "resource": "MEl-45428b930000c3a80141e28b7d4b5ae5",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2013-09-22T12:41:00+02:00"
                    }, {
                        "id": "SH-MEl-5b078fa50000bca80137f36ed05c43cb",
                        "resource": "MEl-5b078fa50000bca80137f36ed05c43cb",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2012-05-17T15:40:00+02:00"
                    }, {
                        "id": "SH-MEl-453facbb0000c3a80141c43d2fb4f5e2",
                        "resource": "MEl-453facbb0000c3a80141c43d2fb4f5e2",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2013-09-22T12:39:00+02:00"
                    }, {
                        "id": "SH-MEl-459b92580000c3a80141cb4acb521ab1",
                        "resource": "MEl-459b92580000c3a80141cb4acb521ab1",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2013-09-22T14:18:00+02:00"
                    }, {
                        "id": "SH-MEl-45384cd10000c3a80141c1f85d7c26e6",
                        "resource": "MEl-45384cd10000c3a80141c1f85d7c26e6",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2013-09-22T12:30:00+02:00"
                    }, {
                        "id": "SH-MEl-607f13b50000bca80137ba95f11856ab",
                        "resource": "MEl-607f13b50000bca80137ba95f11856ab",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2012-05-18T17:09:00+02:00"
                    }, {
                        "id": "SH-MEl-4543fe900000c3a80141f5253ff13c35",
                        "resource": "MEl-4543fe900000c3a80141f5253ff13c35",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2013-09-22T12:43:00+02:00"
                    }, {
                        "id": "SH-MEl-453d34af0000c3a80141918f84641161",
                        "resource": "MEl-453d34af0000c3a80141918f84641161",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2013-09-22T12:35:00+02:00"
                    }],
                    "revision": 1,
                    "changedAt": "2016-05-26T08:59:00+02:00"
                }],
                "revision": 1,
                "changedAt": "2016-05-26T08:59:00+02:00"
            }, {
                "id": "SH-Fld-59c8a7730000bca80137509a49b1218b",
                "resource": "Fld-59c8a7730000bca80137509a49b1218b",
                "nodes": [{
                    "id": "SH-MEl-5bd6bd890000bca8013739588a3f43d6-1",
                    "resource": "MEl-5bd6bd890000bca8013739588a3f43d6",
                    "nodes": [],
                    "revision": 1,
                    "changedAt": "2012-05-17T19:30:00+02:00"
                }, {
                    "id": "SH-MEl-5bcfb01d0000bca80137f303272a5557-10",
                    "resource": "MEl-5bcfb01d0000bca80137f303272a5557",
                    "nodes": [],
                    "revision": 1,
                    "changedAt": "2015-11-08T23:36:00+01:00"
                }, {
                    "id": "SH-MEl-803fd3750000c3a8013cf1fdb3b26d33-11",
                    "resource": "MEl-803fd3750000c3a8013cf1fdb3b26d33",
                    "nodes": [{
                        "id": "SH-MEl-5a489c300000bca80137ee1373c16844-12",
                        "resource": "MEl-5a489c300000bca80137ee1373c16844",
                        "nodes": [{
                            "id": "SH-MEl-5a7776c50000bca8013765ae93af9209-13",
                            "resource": "MEl-5a7776c50000bca8013765ae93af9209",
                            "nodes": [],
                            "revision": 1,
                            "changedAt": "2013-09-22T00:12:00+02:00"
                        }, {
                            "id": "SH-MEl-5a76365c0000bca8013776e91afd1e8e-14",
                            "resource": "MEl-5a76365c0000bca8013776e91afd1e8e",
                            "nodes": [],
                            "revision": 1,
                            "changedAt": "2012-05-17T17:17:00+02:00"
                        }, {
                            "id": "SH-MEl-5a9ce0310000bca801378176dc4744e8-15",
                            "resource": "MEl-5a9ce0310000bca801378176dc4744e8",
                            "nodes": [],
                            "revision": 1,
                            "changedAt": "2014-06-27T02:24:00+02:00"
                        }, {
                            "id": "SH-MEl-5a752ccc0000bca80137479a2e8bab30-16",
                            "resource": "MEl-5a752ccc0000bca80137479a2e8bab30",
                            "nodes": [{
                                "id": "SH-MEl-5a85347c0000bca80137ad485c7cd330-17",
                                "resource": "MEl-5a85347c0000bca80137ad485c7cd330",
                                "nodes": [{
                                    "id": "SH-MEl-5b2f95ec0000bca8013709bfa81d701f-18",
                                    "resource": "MEl-5b2f95ec0000bca8013709bfa81d701f",
                                    "nodes": [],
                                    "revision": 1,
                                    "changedAt": "2012-05-17T16:24:00+02:00"
                                }, {
                                    "id": "SH-MEl-45450be80000c3a801414f280f146c71-19",
                                    "resource": "MEl-45450be80000c3a801414f280f146c71",
                                    "nodes": [],
                                    "revision": 1,
                                    "changedAt": "2013-09-22T12:44:00+02:00"
                                }, {
                                    "id": "SH-MEl-4536b0350000c3a801415986f8ea806a-20",
                                    "resource": "MEl-4536b0350000c3a801415986f8ea806a",
                                    "nodes": [],
                                    "revision": 1,
                                    "changedAt": "2013-09-22T12:33:00+02:00"
                                }, {
                                    "id": "SH-MEl-5b149eab0000bca80137aad99b6eea7b-21",
                                    "resource": "MEl-5b149eab0000bca80137aad99b6eea7b",
                                    "nodes": [],
                                    "revision": 1,
                                    "changedAt": "2012-05-17T15:55:00+02:00"
                                }, {
                                    "id": "SH-MEl-5b08ed8d0000bca8013719f554353b0e-22",
                                    "resource": "MEl-5b08ed8d0000bca8013719f554353b0e",
                                    "nodes": [],
                                    "revision": 1,
                                    "changedAt": "2012-05-17T15:51:00+02:00"
                                }, {
                                    "id": "SH-MEl-453dfb670000c3a8014191107df4565e-23",
                                    "resource": "MEl-453dfb670000c3a8014191107df4565e",
                                    "nodes": [],
                                    "revision": 1,
                                    "changedAt": "2013-09-22T12:36:00+02:00"
                                }, {
                                    "id": "SH-MEl-5b094f8a0000bca801374c798a6587ad-24",
                                    "resource": "MEl-5b094f8a0000bca801374c798a6587ad",
                                    "nodes": [],
                                    "revision": 1,
                                    "changedAt": "2012-05-17T15:42:00+02:00"
                                }, {
                                    "id": "SH-MEl-45428b930000c3a80141e28b7d4b5ae5-25",
                                    "resource": "MEl-45428b930000c3a80141e28b7d4b5ae5",
                                    "nodes": [],
                                    "revision": 1,
                                    "changedAt": "2013-09-22T12:41:00+02:00"
                                }, {
                                    "id": "SH-MEl-5b078fa50000bca80137f36ed05c43cb-26",
                                    "resource": "MEl-5b078fa50000bca80137f36ed05c43cb",
                                    "nodes": [],
                                    "revision": 1,
                                    "changedAt": "2012-05-17T15:40:00+02:00"
                                }, {
                                    "id": "SH-MEl-453facbb0000c3a80141c43d2fb4f5e2-27",
                                    "resource": "MEl-453facbb0000c3a80141c43d2fb4f5e2",
                                    "nodes": [],
                                    "revision": 1,
                                    "changedAt": "2013-09-22T12:39:00+02:00"
                                }, {
                                    "id": "SH-MEl-5b2d29070000bca801378a6c020cf8f5-28",
                                    "resource": "MEl-5b2d29070000bca801378a6c020cf8f5",
                                    "nodes": [],
                                    "revision": 1,
                                    "changedAt": "2012-05-17T16:35:00+02:00"
                                }, {
                                    "id": "SH-MEl-5b1750f80000bca801373b2d143d7478-29",
                                    "resource": "MEl-5b1750f80000bca801373b2d143d7478",
                                    "nodes": [],
                                    "revision": 1,
                                    "changedAt": "2012-05-17T16:36:00+02:00"
                                }, {
                                    "id": "SH-MEl-5b2ddad80000bca80137c44d62ba97d8-30",
                                    "resource": "MEl-5b2ddad80000bca80137c44d62ba97d8",
                                    "nodes": [],
                                    "revision": 1,
                                    "changedAt": "2012-05-17T16:35:00+02:00"
                                }, {
                                    "id": "SH-MEl-5b2449180000bca8013722c01c9d35a5-31",
                                    "resource": "MEl-5b2449180000bca8013722c01c9d35a5",
                                    "nodes": [],
                                    "revision": 1,
                                    "changedAt": "2012-05-17T16:36:00+02:00"
                                }, {
                                    "id": "SH-MEl-5b0839b90000bca801376dcca41ca7d0-32",
                                    "resource": "MEl-5b0839b90000bca801376dcca41ca7d0",
                                    "nodes": [],
                                    "revision": 1,
                                    "changedAt": "2012-05-17T18:06:00+02:00"
                                }, {
                                    "id": "SH-MEl-5b07e6aa0000bca8013797aad9be69ae-33",
                                    "resource": "MEl-5b07e6aa0000bca8013797aad9be69ae",
                                    "nodes": [],
                                    "revision": 1,
                                    "changedAt": "2012-05-17T15:53:00+02:00"
                                }, {
                                    "id": "SH-MEl-4543fe900000c3a80141f5253ff13c35-34",
                                    "resource": "MEl-4543fe900000c3a80141f5253ff13c35",
                                    "nodes": [],
                                    "revision": 1,
                                    "changedAt": "2013-09-22T12:43:00+02:00"
                                }, {
                                    "id": "SH-MEl-453d34af0000c3a80141918f84641161-35",
                                    "resource": "MEl-453d34af0000c3a80141918f84641161",
                                    "nodes": [],
                                    "revision": 1,
                                    "changedAt": "2013-09-22T12:35:00+02:00"
                                }],
                                "revision": 1,
                                "changedAt": "2014-06-26T15:17:00+02:00"
                            }, {
                                "id": "SH-MEl-5a808e2a0000bca80137bfd74268a84a-36",
                                "resource": "MEl-5a808e2a0000bca80137bfd74268a84a",
                                "nodes": [],
                                "revision": 1,
                                "changedAt": "2015-02-10T08:58:00+01:00"
                            }, {
                                "id": "SH-MEl-5a844d820000bca8013750b9a0410b6b-37",
                                "resource": "MEl-5a844d820000bca8013750b9a0410b6b",
                                "nodes": [],
                                "revision": 1,
                                "changedAt": "2013-09-22T00:03:00+02:00"
                            }, {
                                "id": "SH-MEl-5a8009a00000bca80137ef95bc3f643f-38",
                                "resource": "MEl-5a8009a00000bca80137ef95bc3f643f",
                                "nodes": [],
                                "revision": 1,
                                "changedAt": "2015-02-10T08:58:00+01:00"
                            }, {
                                "id": "SH-MEl-5a87083e0000bca801379bb412523737-39",
                                "resource": "MEl-5a87083e0000bca801379bb412523737",
                                "nodes": [],
                                "revision": 1,
                                "changedAt": "2014-06-27T02:26:00+02:00"
                            }, {
                                "id": "SH-MEl-5a82ec6f0000bca801372ef053a71bdf-40",
                                "resource": "MEl-5a82ec6f0000bca801372ef053a71bdf",
                                "nodes": [],
                                "revision": 1,
                                "changedAt": "2013-09-22T00:03:00+02:00"
                            }, {
                                "id": "SH-MEl-5a86b8980000bca80137ca6fde1a125e-41",
                                "resource": "MEl-5a86b8980000bca80137ca6fde1a125e",
                                "nodes": [],
                                "revision": 1,
                                "changedAt": "2013-09-22T00:04:00+02:00"
                            }, {
                                "id": "SH-MEl-5a820a3c0000bca801378c9093fb7d80-42",
                                "resource": "MEl-5a820a3c0000bca801378c9093fb7d80",
                                "nodes": [],
                                "revision": 1,
                                "changedAt": "2013-09-22T00:02:00+02:00"
                            }],
                            "revision": 1,
                            "changedAt": "2013-09-22T00:09:00+02:00"
                        }, {
                            "id": "SH-MEl-5a71c4800000bca80137f2aaa7b63000-43",
                            "resource": "MEl-5a71c4800000bca80137f2aaa7b63000",
                            "nodes": [{
                                "id": "SH-FQgXJn1XkNFtoJfzE9INisIYifq",
                                "resource": "MEl-606f16ac0000bca801373587fda932b3",
                                "nodes": [{
                                    "id": "SH-uCdHBtCyX6hvm29RQnGo9zcd3OI",
                                    "resource": "MEl-45450be80000c3a801414f280f146c71",
                                    "nodes": [],
                                    "revision": 2,
                                    "changedAt": "2016-10-25T23:49:14+02:00"
                                }, {
                                    "id": "SH-O797STWMNt59GjyRpy8CQgp6Deo",
                                    "resource": "MEl-4536b0350000c3a801415986f8ea806a",
                                    "nodes": [],
                                    "revision": 2,
                                    "changedAt": "2016-10-25T23:49:14+02:00"
                                }, {
                                    "id": "SH-pkrTYLvHEXGE5n3XT3kwOzWpRPr",
                                    "resource": "MEl-453facbb0000c3a80141c43d2fb4f5e2",
                                    "nodes": [],
                                    "revision": 2,
                                    "changedAt": "2016-10-25T23:49:14+02:00"
                                }, {
                                    "id": "SH-wRzqOjw6Ob6TAfaCorCQ2BicqM3",
                                    "resource": "MEl-4543fe900000c3a80141f5253ff13c35",
                                    "nodes": [],
                                    "revision": 2,
                                    "changedAt": "2016-10-25T23:49:14+02:00"
                                }, {
                                    "id": "SH-pRuyfnegfxL7Pfq3S4HyInkjJLS",
                                    "resource": "MEl-453d34af0000c3a80141918f84641161",
                                    "nodes": [],
                                    "revision": 2,
                                    "changedAt": "2016-10-25T23:49:14+02:00"
                                }, {
                                    "id": "SH-54q5IJNgLaHAFR03snGsSWwcCfm",
                                    "resource": "MEl-45a236e00000c3a801410f6503287e16",
                                    "nodes": [],
                                    "revision": 2,
                                    "changedAt": "2016-10-25T23:49:14+02:00"
                                }, {
                                    "id": "SH-dUbVcCseAuR93ODSCP2VFObou2U",
                                    "resource": "MEl-45a3b13c0000c3a801415e97f5bc29d1",
                                    "nodes": [],
                                    "revision": 2,
                                    "changedAt": "2016-10-25T23:49:14+02:00"
                                }],
                                "revision": 2,
                                "changedAt": "2016-10-25T23:49:14+02:00"
                            }],
                            "revision": 1,
                            "changedAt": "2013-09-22T00:10:00+02:00"
                        }, {
                            "id": "SH-MEl-5a4dd77b0000bca8013736c6912ad291-44",
                            "resource": "MEl-5a4dd77b0000bca8013736c6912ad291",
                            "nodes": [],
                            "revision": 1,
                            "changedAt": "2015-11-15T13:54:00+01:00"
                        }, {
                            "id": "SH-MEl-5a99c89c0000bca801375d44cf9a50ca-45",
                            "resource": "MEl-5a99c89c0000bca801375d44cf9a50ca",
                            "nodes": [],
                            "revision": 1,
                            "changedAt": "2013-09-22T00:16:00+02:00"
                        }, {
                            "id": "SH-MEl-5a9929510000bca80137d23c81f1ca54-46",
                            "resource": "MEl-5a9929510000bca80137d23c81f1ca54",
                            "nodes": [],
                            "revision": 1,
                            "changedAt": "2013-09-22T00:15:00+02:00"
                        }, {
                            "id": "SH-MEl-5c29fb8e0000bca80137eb9734c99bfd-47",
                            "resource": "MEl-5c29fb8e0000bca80137eb9734c99bfd",
                            "nodes": [],
                            "revision": 1,
                            "changedAt": "2013-09-22T00:15:00+02:00"
                        }, {
                            "id": "SH-MEl-5a77385f0000bca80137e1c7dc0b1721-48",
                            "resource": "MEl-5a77385f0000bca80137e1c7dc0b1721",
                            "nodes": [],
                            "revision": 1,
                            "changedAt": "2013-09-22T00:12:00+02:00"
                        }, {
                            "id": "SH-MEl-5a9888810000bca801375410ce1cc142-49",
                            "resource": "MEl-5a9888810000bca801375410ce1cc142",
                            "nodes": [],
                            "revision": 1,
                            "changedAt": "2013-09-22T00:15:00+02:00"
                        }, {
                            "id": "SH-MEl-5a4d6dee0000bca80137c1caf2f42349-50",
                            "resource": "MEl-5a4d6dee0000bca80137c1caf2f42349",
                            "nodes": [],
                            "revision": 1,
                            "changedAt": "2015-11-15T13:54:00+01:00"
                        }, {
                            "id": "SH-MEl-5a9b7a9b0000bca80137d768644696b7-51",
                            "resource": "MEl-5a9b7a9b0000bca80137d768644696b7",
                            "nodes": [],
                            "revision": 1,
                            "changedAt": "2013-09-22T00:09:00+02:00"
                        }, {
                            "id": "SH-MEl-463289cd0000c3a80141be3fc417034a-52",
                            "resource": "MEl-463289cd0000c3a80141be3fc417034a",
                            "nodes": [],
                            "revision": 1,
                            "changedAt": "2014-03-29T16:30:00+01:00"
                        }],
                        "revision": 1,
                        "changedAt": "2012-05-17T17:11:00+02:00"
                    }, {
                        "id": "SH-MEl-5a4c80c20000bca8013753b6999a4da8-53",
                        "resource": "MEl-5a4c80c20000bca8013753b6999a4da8",
                        "nodes": [{
                            "id": "SH-MEl-5a4dd77b0000bca8013736c6912ad291-54",
                            "resource": "MEl-5a4dd77b0000bca8013736c6912ad291",
                            "nodes": [],
                            "revision": 1,
                            "changedAt": "2015-11-15T13:54:00+01:00"
                        }, {
                            "id": "SH-MEl-5a4cfa830000bca801370d837f761f3e-55",
                            "resource": "MEl-5a4cfa830000bca801370d837f761f3e",
                            "nodes": [],
                            "revision": 1,
                            "changedAt": "2015-11-08T23:38:00+01:00"
                        }, {
                            "id": "SH-MEl-5a4d2bd00000bca80137a3f233cdffeb-56",
                            "resource": "MEl-5a4d2bd00000bca80137a3f233cdffeb",
                            "nodes": [],
                            "revision": 1,
                            "changedAt": "2015-11-08T23:38:00+01:00"
                        }, {
                            "id": "SH-MEl-5a4d6dee0000bca80137c1caf2f42349-57",
                            "resource": "MEl-5a4d6dee0000bca80137c1caf2f42349",
                            "nodes": [],
                            "revision": 1,
                            "changedAt": "2015-11-15T13:54:00+01:00"
                        }],
                        "revision": 1,
                        "changedAt": "2012-05-18T20:53:00+02:00"
                    }, {
                        "id": "SH-MEl-5a52b50c0000bca801377e3d15255f98-58",
                        "resource": "MEl-5a52b50c0000bca801377e3d15255f98",
                        "nodes": [{
                            "id": "SH-MEl-5bcf35cf0000bca8013776d68023612a-59",
                            "resource": "MEl-5bcf35cf0000bca8013776d68023612a",
                            "nodes": [],
                            "revision": 1,
                            "changedAt": "2012-05-17T19:25:00+02:00"
                        }],
                        "revision": 1,
                        "changedAt": "2012-05-17T19:18:00+02:00"
                    }, {
                        "id": "SH-MEl-5a51dd920000bca8013770a4395c83fc-60",
                        "resource": "MEl-5a51dd920000bca8013770a4395c83fc",
                        "nodes": [{
                            "id": "SH-MEl-5a4dd77b0000bca8013736c6912ad291-61",
                            "resource": "MEl-5a4dd77b0000bca8013736c6912ad291",
                            "nodes": [],
                            "revision": 1,
                            "changedAt": "2015-11-15T13:54:00+01:00"
                        }, {
                            "id": "SH-MEl-5a4d6dee0000bca80137c1caf2f42349-62",
                            "resource": "MEl-5a4d6dee0000bca80137c1caf2f42349",
                            "nodes": [],
                            "revision": 1,
                            "changedAt": "2015-11-15T13:54:00+01:00"
                        }],
                        "revision": 1,
                        "changedAt": "2012-05-17T16:59:00+02:00"
                    }, {
                        "id": "SH-MEl-5a50d5b60000bca8013781532547ce93-63",
                        "resource": "MEl-5a50d5b60000bca8013781532547ce93",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2012-10-03T17:46:00+02:00"
                    }],
                    "revision": 1,
                    "changedAt": "2013-01-28T09:28:00+01:00"
                }, {
                    "id": "SH-MEl-5a47935a0000bca801377c17f8cb25b0-64",
                    "resource": "MEl-5a47935a0000bca801377c17f8cb25b0",
                    "nodes": [{
                        "id": "SH-MEl-608177820000bca801379179ebf3b6aa-65",
                        "resource": "MEl-608177820000bca801379179ebf3b6aa",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2013-09-22T14:11:00+02:00"
                    }, {
                        "id": "SH-MEl-611366530000bca80137a97f194e96a3-66",
                        "resource": "MEl-611366530000bca80137a97f194e96a3",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2013-09-22T14:11:00+02:00"
                    }, {
                        "id": "SH-MEl-453862540000c3a801419d91bef48cfd-67",
                        "resource": "MEl-453862540000c3a801419d91bef48cfd",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2013-09-22T12:30:00+02:00"
                    }, {
                        "id": "SH-MEl-45387c0b0000c3a801410aa03f6b9be4-68",
                        "resource": "MEl-45387c0b0000c3a801410aa03f6b9be4",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2013-09-22T12:30:00+02:00"
                    }, {
                        "id": "SH-MEl-4538920b0000c3a801415c67e334b8a1-69",
                        "resource": "MEl-4538920b0000c3a801415c67e334b8a1",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2013-09-22T12:30:00+02:00"
                    }, {
                        "id": "SH-MEl-608239830000bca801373690c7d2af0f-70",
                        "resource": "MEl-608239830000bca801373690c7d2af0f",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2013-09-22T14:11:00+02:00"
                    }, {
                        "id": "SH-MEl-610b07100000bca80137c10f96c46247-71",
                        "resource": "MEl-610b07100000bca80137c10f96c46247",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2013-09-22T14:11:00+02:00"
                    }, {
                        "id": "SH-MEl-610e0b010000bca80137ac40800bb1b8-72",
                        "resource": "MEl-610e0b010000bca80137ac40800bb1b8",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2012-05-18T19:45:00+02:00"
                    }, {
                        "id": "SH-MEl-459b92580000c3a80141cb4acb521ab1-73",
                        "resource": "MEl-459b92580000c3a80141cb4acb521ab1",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2013-09-22T14:18:00+02:00"
                    }, {
                        "id": "SH-MEl-45384cd10000c3a80141c1f85d7c26e6-74",
                        "resource": "MEl-45384cd10000c3a80141c1f85d7c26e6",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2013-09-22T12:30:00+02:00"
                    }, {
                        "id": "SH-MEl-607f13b50000bca80137ba95f11856ab-75",
                        "resource": "MEl-607f13b50000bca80137ba95f11856ab",
                        "nodes": [],
                        "revision": 1,
                        "changedAt": "2012-05-18T17:09:00+02:00"
                    }],
                    "revision": 1,
                    "changedAt": "2012-05-17T19:38:00+02:00"
                }],
                "revision": 1,
                "changedAt": "2016-05-26T08:59:00+02:00"
            }]
        }],
        "files": []
    }
};
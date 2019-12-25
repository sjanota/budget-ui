export default {
  buttons: {
    create: 'Dodaj',
    cancel: 'Anuluj',
    save: 'Zapisz',
  },
  sidebar: {
    sections: {
      currentMonth: 'Bieżący miesiąc',
      budget: 'Budżet',
    },
    pages: {
      dashboard: 'Podsumowanie',
      expenses: 'Wydatki',
      transfers: 'Przelewy',
      plans: 'Plany',
      accounts: 'Konta',
      envelopes: 'Koperty',
    },
  },
  topbar: {
    budgetLabel: 'Budżet',
    alertsLabel: 'Powiadomienia',
    messagesLabel: 'Wiadomości',
  },
  dashboard: {
    planned: 'Zaplanowano',
    incomes: 'Wpływy',
    leftToPlan: 'Pozostało do zaplanowania',
    expenses: 'Wydatki',
    currentMonth: 'Bieżący miesiąc',
    noProblems: 'Wszystko w porządku',
    problems: {
      title: 'Problemy',
      overplanned: 'Plany na bieżący miesiąc przekraczają wpływy',
      underplanned: 'Część środków jest nierozplanowana',
      expensesExceedPlans: [
        'Wydatki przekroczyły zaplanowany budżet na kopercie',
        '',
      ],
      envelopeOverLimit: ['Limit dla koperty "', '" został przekroczony'],
      negativeAccountBalance: ['Bilans na koncie "', '" jest ujemny'],
      monthNotEnded: 'Miesiąc się jeszcze nie skończył',
    },
    buttons: {
      closeMonth: 'Zamknij miesiąc',
    },
  },
  accounts: {
    table: {
      title: 'Konta',
      columns: {
        balance: 'Bilans',
        name: 'Nazwa',
      },
    },
    expensesTableTitle: 'Wydatki',
    inTransfersTableTitle: 'Przelewy przychodzące',
    outTransfersTableTitle: 'Przelewy wychodzące',
    modal: {
      createTitle: 'Dodaj nowe konto',
      editTitle: 'Edytuj konto',
      labels: {
        name: 'Nazwa',
      },
    },
  },
  envelopes: {
    table: {
      title: 'Koperty',
      columns: {
        balance: 'Bilans',
        name: 'Nazwa',
        limit: 'Limit',
        overLimit: 'Ponad limit',
      },
    },
    expensesTableTitle: 'Wydatki',
    inPlansTableTitle: 'Plany przychodzące',
    outPlansTableTitle: 'Plany wychodzące',
    modal: {
      createTitle: 'Dodaj nową kopertę',
      editTitle: 'Edytuj kopertę',
      labels: {
        name: 'Nazwa',
        limit: 'Limit',
      },
    },
  },
  categories: {
    table: {
      title: 'Kategorie',
      columns: {
        name: 'Nazwa',
        envelope: 'Koperta',
        description: 'Opis',
      },
    },
    modal: {
      createTitle: 'Dodaj nową kategorię',
      editTitle: 'Edytuj kategorię',
      labels: {
        name: 'Nazwa',
        envelope: 'Koperta',
        description: 'Opis',
      },
    },
  },
  plans: {
    table: {
      title: 'Plany',
      columns: {
        title: 'Tytuł',
        fromEnvelope: 'Z',
        toEnvelope: 'Do',
        currentAmount: 'Kwota',
      },
    },
    modal: {
      createTitle: 'Dodaj nowy plan',
      editTitle: 'Edytuj plan',
      labels: {
        title: 'Tytuł',
        fromEnvelope: 'Z',
        toEnvelope: 'Do',
        amount: 'Kwota',
        recurring: 'Cyklicznie',
      },
    },
  },
  transfers: {
    table: {
      title: 'Przelewy',
      columns: {
        title: 'Tytuł',
        fromAccount: 'Z',
        toAccount: 'Do',
        amount: 'Kwota',
        date: 'Data',
      },
    },
    modal: {
      createTitle: 'Dodaj nowy przelew',
      editTitle: 'Edytuj przelew',
      labels: {
        title: 'Tytuł',
        fromAccount: 'Z',
        toAccount: 'Do',
        amount: 'Kwota',
        date: 'Data',
      },
    },
  },
  expenses: {
    table: {
      title: 'Wydatki',
      columns: {
        title: 'Tytuł',
        totalAmount: 'Kwota',
        date: 'Data',
        account: 'Konto',
      },
    },
    modal: {
      createTitle: 'Dodaj nowy wydatek',
      editTitle: 'Edytuj wydatek',
      labels: {
        title: 'Tytuł',
        fromAccount: 'Z',
        toAccount: 'Do',
        account: 'Konto',
        date: 'Data',
        categories: 'Kategorie',
        amount: 'Kwota',
        category: 'Kategoria',
      },
    },
  },
  months: [
    'Styczeń',
    'Luty',
    'Marzec',
    'Kwiecień',
    'Maj',
    'Czerwiec',
    'Lipiec',
    'Sierpień',
    'Wrzesień',
    'Październik',
    'Listopad',
    'Grudzień',
  ],
};

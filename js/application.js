var CONSEQUENCE_POSITIVE = 'Positive',
  CONSEQUENCE_NEUTRAL = 'Neutral',
  CONSEQUENCE_NEGATIVE = 'Negative';

var Game = {
  options: {
    fadeTime: 3000,
    showPreEffects: false, // Show effects under choices
    showPostEffects: true, // Show effects on consequences modal
    toolTipPlacement: 'right', // Tooltip direction of people opinion and greeting
    hiddenFactorWeight: 0.25 // Weight [0, 1] for hidden factors to affect QoL score
  },
  carousel: null,
  now: new Date(),
  people: [
    {
      name: 'EnerGen',
      role: 'energy',
      greeting: "I represent EnerGen, a large multinational corporation using state of the art technologies to develop new sources of energy.",
      icon: './img/Energy.png'
    },
    {
      name: 'GreenForce',
      role: 'environmentalist',
      greeting: "I'm a spokesman for GreenForce, a non-profit member-supported environmental organization.",
      icon: './img/Environmentalist.png'
    }
  ],
  resources: {
    economy: {
      name: 'Economy',
      type: 'factor',
      num: 100,
      icon: './img/Button_economy.png'
    },
    environment: {
      name: 'Environment',
      type: 'factor',
      num: 100,
      icon: './img/Button_environment.png'
    },
    health: {
      name: 'Health',
      type: 'factor',
      num: 100,
      icon: './img/Button_health.png'
    },
    publicOpinion: {
      name: 'Public Opinion',
      type: 'hidden',
      num: 0,
      icon: 'http://placekitten.com/16/16'
    },
    knowledge: {
      name: 'Knowledge',
      type: 'hidden',
      num: 0,
      icon: 'http://placekitten.com/16/16'
    },
    quality_of_life: {
      name: 'Quality of Life - combination score of factors including economic, environmental, health, public opinion, and industry support.',
      type: 'sum',
      num: 100,
      icon: './img/Button_quality_of_life.png'
    }
  },
  role: null,
  state: {
    choices: []
  },
  screens: {

    begin: {
      daysToAdd: 0,
      header: 'News Flash',
      message: 'A team of geologists has published a study showing huge deposits of shale oil and gas that is retrievable through hydraulic fracturing or "fracking". Energy companies are already deploying themselves to find leasable land over these deposits. Environmental organizations are also gearing up to make sure that the negative effects of fracking are kept under  control. Government officials are looking at their existing regulations of mining regulations to determine what changes need to be made.',
      backgroundLinks: '<a href="http://en.wikipedia.org/wiki/Hydraulic_fracturing" target="_blank">Wikipedia Entry for Hydraulic Fracturing</a>, <a href="http://www.youtube.com/watch?feature=endscreen&v=xtZI2RAAeyo&NR=1" target="_blank">Marcellus Shale: Powering an American Renaissance</a>, <a href="http://www.youtube.com/watch?v=dZe1AeH0Qz8" target="_blank">Gasland Trailer</a>',
      choices: {
        appointCommittee: {
          name: 'Appoint a committee to investigate the consequences of fracking as found in other states and prepare a white paper to guide the policy of the state.',
          consequence: "It's always good to gather a range of opinions and put them into a formal document. Some observers, though, may think that you're doing the typical government thing of postponing action rather than active problem-solving.",
          consequenceType: CONSEQUENCE_NEUTRAL,
          opinions: {
            energy: "Fracking is a proven technology with no proven negative impacts. We'll be happy to assist you in completing your report.",
            environmentalist: "Fracking has been shown to negatively impact the air and water, and thus health. We'll be happy to assist you in completing your report."
          },
          effect: {
            knowledge: 5
          }
        },
        welcomeIndustry: {
          name: 'Welcome the industry to begin exploratory drilling. The state budget situation has been grim for so long that the idea of cheaper energy and more jobs is appealing.',
          consequence: "You've instantly galvanized both your supporters and those who voted for the other party. Some applaud the creation of a business-friendly environment, others (a larger percentage) see you as a puppet of the 1%.",
          consequenceType: CONSEQUENCE_NEGATIVE,
          opinions: {
            energy: "We're eager to work with you!",
            environmentalist: "Whatever happened to making decisions based on scientific research? You're rushing into this without thinking about the consequences."
          },
          effect: {
            publicOpinion: -10,
            economy: 10
          }
        },
        assembleForum: {
          name: 'Assemble a public forum of leading environmentalist, business, and public interest groups to discuss the impact of fracking on the state.',
          consequence: "You've made the topic more visible and more likely to engage the public in thinking about it. All sides of the issue will be aired at some level, though probably not at a depth needed to make sound decisions. Dramatic stories of environmental damage that emerge at the forum will most likely outweigh (at least initially) the potential positive economic benefits.",
          consequenceType: CONSEQUENCE_POSITIVE,
          opinions: {
            energy: "This is a great way to get the word out about the economic benefits of fracking. We'll help you by sharing the most interesting parts of the discussion out on our web sites.",
            environmentalist: "This is a great way to get the word out about the environmental dangers of fracking. We'll help you by sharing the most interesting parts of the discussion out on our web sites."
          },
          effect: {
            knowledge: 10,
            publicOpinion: -5
          }
        }
      }
    },

    explore: {
      daysToAdd: 90,
      header: '',
      message: 'Exploratory drilling near the town of Squamatuck has demonstrated that the deposits may be even larger than previously thought. Additional workers are being hired to develop the site for extraction.  Purchase of equipment and services is projected to have a small, positive impact on the state budget. Membership and interest in environmental organizations is also on the rise as concerns are raised about the impact on the environment.',
      backgroundLinks: '<a href="http://www.nbcbayarea.com/news/local/California-Will-Regulate-Fracking-After-All-174408581.html" target="_blank">California will Regulate Fracking After All</a>, <a href="http://www.huffingtonpost.com/2013/01/25/fracking-pennsylvania-natural-gas-lease-landman_n_2546824.html?utm_hp_ref=mostpopular" target="_blank">Fracking In Pennsylvania Sets Up Dilemma For Locals: Quick Money Or Long-Term Health Concerns?</a>',
      choices: {
        draftRegulations: {
          name: 'Draft revised regulations on fracking and solicit input from the public.',
          consequence: "Knowing that the government is open to input and ready to act in the best interest of its citizens will improve the public's opinion of government. That discussion that results is likely to improve the fairness and effectiveness of the regulations. The regulations, though, are more likely to restrict the energy companies desire to maximize their profits.",
          consequenceType: CONSEQUENCE_NEUTRAL,
          opinions: {
            energy: "We believe that the industry is already over-regulated. Any changes in the regulations should be in the direction of freeing our business to do what we do best.",
            environmentalist: "We believe that government plays a vital role in putting boundaries on what corporations can do in favor of the common good. We'll be watching closely to make sure that new regulations are effective at protecting the environment we all share."
          },
          effect: {
            knowledge: 5,
            publicOpinion: 10,
            economy: -5,
            health: 5
          }
        },
        awardGrants: {
          name: 'Award research grants to universities to monitor the impact of the drilling at Squamatuck on air and water quality.',
          consequence: "In the short term, the public isn't going to know that this research is going on, so there's no immediate public relations benefit.",
          consequenceType: CONSEQUENCE_NEUTRAL,
          opinions: {
            energy: "We'll be watching the results of these studies carefully.",
            environmentalist: "We'll be watching the results of these studies carefully."
          },
          effect: {
            knowledge: 5
          }
        },
        supportEducation: {
          name: 'Propose legislation to set aside new money from fracking to support schools and universities in the state.',
          consequence: "This decision is popular with the public who are tired of watching their education systems decline through budget cuts.",
          consequenceType: CONSEQUENCE_POSITIVE,
          opinions: {
            energy: "Taxing the energy industry will make our work here less profitable. If you go too far with this, we can always move some of our operations to a friendlier state.",
            environmentalist: "We like this idea, and would like some of the money earmarked for environmental education."
          },
          effect: {
            economy: 10,
            publicOpinion: 15
          }
        }
      }
    },

    production: {
      daysToAdd: 90,
      header: '',
      message: 'Production of natural gas at Squamatuck, Eastwood and Westbury has exceeded all prior energy production in the state. The impact on those towns has been mixed. Real estate values are double what they were a year ago and there is a shortage of living space for the energy workers. No evidence of negative impact on air or water quality has emerged. School districts statewide are reinstating laid-off teachers and cancelled programs. People are speaking of a renaissance for the state, a refreshing change after years of a declining economy.',
      backgroundLinks: '<a href="http://news.nationalgeographic.com/news/energy/2012/11/pictures/121130-north-dakota-oil-boom/" target="_blank">Bakken Shale Oil Boom Transforms North Dakota</a>, <a href="http://www.reuters.com/article/2012/03/08/us-oil-output-bakken-idUSBRE82714V20120308" target="_blank">Shale boom turns North Dakota into No. 3 oil producer</a>, <a href="http://triblive.com/x/pittsburghtrib/business/s_777431.html#axzz2JBjen4Zl" target="_blank">Marcellus shale boom means more than drilling jobs</a>',
      choices: {
        proposeEarmark: {
          name: 'Propose legislation earmarking new corporate taxes on energy production to rebuild roads and bridges.',
          consequence: "This is a popular move, as the public is weary of driving over potholes and rusty bridges. Unemployed construction workers are called back to work.",
          consequenceType: CONSEQUENCE_POSITIVE,
          opinions: {
            energy: "We've always encouraged governments to keep up the roadways to make driving safer and more desirable. Although we think we're already being taxed enough, we can see the benefits of putting new money into infrastructure.",
            environmentalist: "Our preference would be to use this energy windfall to support mass transit."
          },
          effect: {
            publicOpinion: 10,
            economy: 5
          }
        },
        reduceTax: {
          name: 'Reduce the state income tax rate, since the economy growth generated by the energy boom is poised to lead to a budget surplus.',
          consequence: 'This is described as "Returning the taxpayers money to them" and is widely applauded on talk radio stations.',
          consequenceType: CONSEQUENCE_POSITIVE,
          opinions: {
            energy: "Reducing the tax burden on individuals is good for business. We're in favor of this action.",
            environmentalist: "There are so many environmental problems needing government action: brownfield cleanup, highway beautification, state park support. We'd support this as long as those public efforts continue."
          },
          effect: {
            publicOpinion: 10,
            economy: -5
          }
        },
        noEarmarkOrTax: {
          name: "Don't do anything special. Let the good times roll and stay out of the way.",
          consequence: "Government will be seen by some as passive and ineffectual, and by others as doing the right thing by doing nothing. The public perceives the economy as improving but no one is talking about a new renaissance for the state.",
          consequenceType: CONSEQUENCE_NEUTRAL,
          opinions: {
            energy: "Sounds good to us!",
            environmentalist: "We're not impressed. We think the government should be more proactive about protecting the earth."
          },
          effect: {
            economy: 5,
            publicOpinion: -5
          }
        }
      }
    },

    methaneDetected: {
      daysToAdd: 90,
      header: 'News flash',
      message: 'Methane has been detected in the drinking water at Squamatuck! Two elementary schools have been closed as dozens of children reported feeling dizzy and nauseous and some reported an unpleasant smell in the air.',
      backgroundLinks: '<a href="http://www.npr.org/2012/08/28/160128351/methane-making-an-appearance-in-pa-water-supplies" target="_blank">Methane Making an Appearance in PA Water Supply</a>, <a href="http://www.buzzle.com/articles/methane-gas-exposure-symptoms.html" target="_blank">Methane Gas Exposure Symptons</a>, <a href="http://www.damiennow.com/?p=575" target="_blank">Mystery Illness</a>',
      choices: {
        holdPressConference: {
          name: 'Hold a press event to assure the public that the incident is being investigated. The government will continue to monitor the situation and work closely with energy professionals to determine what happened.',
          consequence: "Environmental groups declare a state of emergency and stage protests at the governor's mansion and marches in several cities. Teacher unions launch letter writing campaigns to protest the lack of safety at schools near fracking sites. Media outlets that had previous applauded the state's move into fracking now raise questions about the practice.",
          consequenceType: CONSEQUENCE_NEGATIVE,
          opinions: {
            energy: "Fracking is a proven, safe technology. We have not detected methane in the drinking water and believe that the complaints by children are due to contagious hysteria. We will cooperate with government investigators.",
            environmentalist: "We are not surprised. Greater safeguards should have been put in place before the first well was drilled."
          },
          effect: {
            publicOpinion: -30,
            environment: -10,
            health: -10
          }
        },
        haltFracking: {
          name: 'Declare an immediate halt to fracking operations at Squamatuck. Send state EPA investigators to the site to determine how serious the situation is.',
          consequence: 'The speedy response is generally applauded. Those who had expressed doubts before feel vindicated.',
          consequenceType: CONSEQUENCE_NEUTRAL,
          opinions: {
            energy: "We believe that a temporary halt at Squamatuck is prudent and will work with EPA investigators to put the site back online as quickly as possible.",
            environmentalist: "We are not surprised. Greater safeguards should have been put in place before the first well was drilled. Until more is known, we believe fracking at all sites should be halted."
          },
          effect: {
            publicOpinion: -10,
            environment: -10,
            health: -10
          }
        },
        haltAllFracking: {
          name: "Declare an immediate halt to fracking operations at all sites pending the results of a state EPA investigation.",
          consequence: "Some applaud the government's move, others call it an overreaction.",
          consequenceType: CONSEQUENCE_NEUTRAL,
          opinions: {
            energy: "It's important not to overreact to this situation. Shutting down operations takes time and has a cost. We can't just stop on a dime. The economic impact will be devasting.",
            environmentalist: "The safety of the public is paramount. A complete halt to fracking is the right thing to do. Fracking should not resume until all concerns have been addressed."
          },
          effect: {
            environment: -10,
            health: -10,
            publicOpinion: -5
          }
        }
      }
    },

    economy: {
      daysToAdd: 90,
      header: '',
      message: 'Money continues to flow into the state economy. Optimism is about the future is leading some to propose new spending programs to improve the quality of life in the state. The energy boom, though, has generated new costs of its own. The flow of trucks carrying water and sand is damaging roads near drill sites. Upward pressure on real estate values is making it hard for residents to afford a new home. The influx of new workers is forcing cities and towns to build new schools and reopen some that had been closed. Thoughtful people are looking ahead to a time when the gas runs out, and pointing out the need to invest in the future.',
      backgroundLinks: '<a href="http://bismarcktribune.com/news/columnists/clay-jenkinson/it-s-not-just-an-oil-boom-it-s-an/article_17f93572-cb75-11e1-a78b-001a4bcf887a.html" target="_blank">It\'s not just an oil boom, it\'s an industrial revolution</a>, <a href="http://oilandenergyinvestor.com/2012/11/with-great-energy-fortune-comes-great-responsibility/" target="_blank">With Great Energy Fortune Comes Great Responsibility</a>, <a href="http://www.ogj.com/articles/print/vol-110/issue-11/general-interest/watching-government-how-norway.html" target="_blank">Watching Government: How Norway Avoided Mistakes</a>',
      choices: {
        establishFund: {
          name: 'Establish a permanent fund that invests surplus energy income for the future rather than spending it now. ',
          consequence: "Putting this money aside means that new spending programs, even popular ones, will not grow as fast as some would like. It's likely that future generations will see the wisdom of this decision, but those voting in the next election may not share that perspective.",
          consequenceType: CONSEQUENCE_POSITIVE,
          opinions: {
            energy: "We continue to believe that taxes and fees on energy production should be minimized. If the government has more money than it knows what to do with, leave it to the private section to create more jobs.",
            environmentalist: "We are in favor of this idea, especially if the fund directs some of its investments towards supporting renewable energy research and development."
          },
          effect: {
            economy: 15
          }
        },
        capitalImprovement: {
          name: "Boom times like this don't happen very often. Take advantage of the moment and begin a capital improvement program to renovate state office buildings and build new roads. Spend it while you've got it.",
          consequence: 'The construction industry applauds the move. Employment opportunities open up for those not directly impacted by the energy industry, thus spreading the wealth.',
          consequenceType: CONSEQUENCE_NEUTRAL,
          opinions: {
            energy: "We continue to believe that taxes and fees on energy production should be minimized. If the government has more money than it knows what to do with, leave it to the private section to create more jobs.",
            environmentalist: "We support this move as long as new buildings and retrofits are done with green design principles in mind."
          },
          effect: {
            publicOpinion: 5,
            economy: 5
          }
        },
        fixProblems: {
          name: "Focus on the new problems caused by the boom. Provide housing payment assistance for long term residents priced out of their own neighborhoods. Repair roads damaged by the new truck traffic.",
          consequence: "This decision is applauded by voters who can see the results immediately.",
          consequenceType: CONSEQUENCE_NEUTRAL,
          opinions: {
            energy: "We support the improvement of roads around the fracking sites.",
            environmentalist: "The energy industry should pay for road improvements directly rather than passing that expense on to the state."
          },
          effect: {
            economy: 5,
            publicOpinion: 10
          }
        }
      }
    },

    earthquakes: {
      daysToAdd: 90,
      header: 'News Bulletin',
      message: 'Two unrelated incidents top the front page. First, a number of small earthquakes were felt in the area around Westbury, a location that had never experienced them before. A few hours later, a pipe ruptured at the Eastwood site, releasing millions of gallons of brine and chemicals. The mixture overflowed its container pool and continued downhill to a sensitive marshland and bird habitat. Energy workers and state EPA officials are scrambling to minimize the damage.',
      backgroundLinks: '<a href="http://www.popularmechanics.com/science/energy/coal-oil-gas/pennsylvania-fracking-accident-what-went-wrong-5598621" target="_blank">Pennsylvania Fracking Accident: What Went Wrong?</a>, <a href="http://stateimpact.npr.org/texas/tag/earthquake/" target="_blank">How Oil and Gas Disposal Wells Can Cause Earthquakes</a>',
      choices: {
        anger: {
          name: 'Express outrage that safety procedures were not adequate to prevent the overflow. Summon energy executives to a meeting in the capital to explain what happened.',
          consequence: "Public concern about the impact of fracking reaches new heights. After watching the officials' testimony, there is increasing skepticism about safety and a support for a hefty fine on the industry.",
          consequenceType: CONSEQUENCE_NEUTRAL,
          opinions: {
            energy: "We maintain that everything has risks and that reasonable measures were taken to minimize the chances of accidents like this.",
            environmentalist: "We told you so."
          },
          effect: {
            health: -5,
            environment: -20,
            publicOpinion: -5,
            economy: -5
          }
        },
        levy: {
          name: "Levy a fine on the energy company at fault and tighten up existing regulations with new guidelines and penalties and more stringent inspections.",
          consequence: 'Taking a firm stance against the industry proves to be popular. The fine is large enough to cover the cost of mitigating the damage.',
          consequenceType: CONSEQUENCE_POSITIVE,
          opinions: {
            energy: "We maintain that everything has risks and that reasonable measures were taken to minimize the chances of accidents like this. We don't believe that stricter regulations will improve anything.",
            environmentalist: "We don't think that this is the last time we'll have an accident like this. Future fines should be even stiffer."
          },
          effect: {
            publicOpinion: 5,
            environment: -5
          }
        },
        assurePublic: {
          name: "Assure the public that everything  at the site was done according to established industry practice and that surplus state funds will be used to restore the site.",
          consequence: "The business community supports this approach. Environmentalists are outraged.",
          consequenceType: CONSEQUENCE_NEGATIVE,
          opinions: {
            energy: "We agree with the government's approach and pledge to continue to work closely with EPA officials for the common good.",
            environmentalist: "We are organizing protests and looking for new candidates to support in the next election."
          },
          effect: {
            environment: -5,
            publicOpinion: -10
          }
        }
      }
    }

  },
  monthNames: [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ],
  playOrder: ['begin', 'explore', 'production', 'methaneDetected', 'economy', 'earthquakes'],
  playIndex: 0,
  init: function(){
    console.log('initialize');

    Game.carousel = $('#carousel').carousel({
      interval: false
    });

    $('#modal-choose-role [data-role]').click(Game.setRole);

    $(document).on('click', '.actions button', Game.runAction);

    $(document).on('click', '#modal-effect .continue', Game.nextScreen);

    $(document).on('click', '#modal-choose-role li.disabled a', function(){
      alert('Coming soon!');
    });

    $(document).on('click', '.play-again', function(){
      window.location.reload();
    });

    $('#modal-intro').on('hidden', function(){
      var $video = $('#video');
      $video.attr('src', $video.attr('src'));
    });

    Game.changeDate();

    try {
      lowLag.init({'urlPrefix':'audio/'});
      lowLag.load('Positive.mp3');
      lowLag.load('Neutral.mp3');
      lowLag.load('Negative.mp3');
    }catch(e){}
  },

  setPeople: function(){
    $ul = $('ul.people');
    $.each(Game.people, function(){
      var people = this;
      var $icon = $('<img/>').addClass( people.role ).attr('src', people.icon),
          $span = $('<div/>').text( people.name );
      var $li = $('<li/>').addClass( people.role )
                    .append( $icon )
                    .append( $span );
      $ul.append( $li );

      $icon.click(function(){
        $(this)
          .tooltip('destroy')
          .tooltip({
            title: people.greeting,
            placement: Game.options.toolTipPlacement,
            trigger: 'hover'
          })
          .tooltip('show');
      });
    });
  },

  setResources: function(){
    $ul = $('ul.resources').html('');
    $.each(Game.resources, function(resourceId, resource){
      if(resource.type == 'hidden') return;

      var $icon = $('<img/>').attr('src', resource.icon),
          $span = $('<span/>').addClass('number').text( resource.num );

      var $li = $('<li/>')
                    .attr('title', resource.name)
                    .addClass('span1')
                    .addClass( resourceId )
                    .append( $icon )
                    .append( $span );

      $ul.append( $li );

      $('.resources-container').fadeIn( Game.options.fadeTime );
    });

    Game.calcQoL();
  },

  setRole: function(){
    Game.role = $(this).data('role');
    console.log('Role set to', Game.role);

    Game.setResources();
    Game.setPeople();

    Game.carousel.carousel('next');
    Game.nextScreen();
  },

  nextScreen: function(){
    var keyScreen = Game.playOrder[Game.playIndex++];

    // The End
    if(!keyScreen) {
      Game.carousel.carousel('next');
      Game.end();
      return false;
    }

    var screen = Game.screens[keyScreen],
        $screen = $('.screen');

    Game.changeDate( screen.daysToAdd );

    $screen.find('.text h1').text( screen.header );
    $screen.find('.text p.message').text( screen.message );

    $backgroundLinks = $screen.find('.text p.background-links').html('');
    if( screen.backgroundLinks ) {
      $backgroundLinks
        .append( $('<span/>').append('Background Links: ') )
        .append( screen.backgroundLinks );
    }

    var $actions = $screen.find('.actions ul').html('');

    $.each(screen.choices, function( choiceId, choice ){
      console.log('adding choice', choiceId, choice);

      var $button = $('<button/>')
                      .attr('data-toggle', 'modal')
                      .attr('data-target', '#modal-effect')
                      .addClass('btn btn-info')
                      .addClass( choiceId )
                      .data('choice', choice)
                      .text( choice.name );

      var $effects = $('<ul/>').addClass('effects unstyled inline hide');

      if(Game.options.showPreEffects && choice.effect) {
        $.each(choice.effect, function(effectKey, effectValue){
          var effectName = Game.resources[effectKey].name;
          $effects.append( $('<li/>').html( effectName + ( effectValue > 0 ? ' <span class="positive">+' : ' <span class="negative">') + '</span>') ); // effectValue +
        });
      }

      var $li = $('<li/>')
                  .append( $button )
                  .append( $effects );

      $actions.append( $li );

      $.each(choice.opinions, function(person, opinion){
        var $person = $('.people').find('img.' + person);

        if( !$person.length ) return;

        var buttonSelector = 'button.' + choiceId;

        $(document).on('mouseenter', buttonSelector, function(){
          console.log('hover in', this);
          $person
            .tooltip('destroy')
            .tooltip({
              title: opinion,
              placement: Game.options.toolTipPlacement,
              trigger: 'manual'
            })
            .tooltip('show');
        });

        $(document).on('mouseout', buttonSelector, function(){
          console.log('hover out', this);
          $person
            .tooltip('hide');
        });

      });

    });

    window.scrollTo(0, 0);

  },

  runAction: function(){
    var action = $(this);
    var choice = action.data('choice');

    console.log('run action', choice);

    var $effects = $('<ul/>').addClass('effects unstyled inline hide');

    $.each(choice.effect, function(effectKey, effectValue){
      var effectName = Game.resources[effectKey].name;
      if(Game.options.showPostEffects) {
        $effects.append( $('<li/>').html( effectName + ( effectValue > 0 ? ' <span class="positive">+' : ' <span class="negative">') + effectValue + '</span>') );
      }
      Game.resources[effectKey].num += effectValue;
    });

    var $modal = $('#modal-effect');

    $modal
      .removeClass('negative neutral positive')
      .addClass( choice.consequenceType.toLowerCase() );

    var $continue = $modal.find('.btn.continue');
    var btnClass = 'btn-primary';

    if(choice.consequenceType == CONSEQUENCE_POSITIVE){
      btnClass = 'btn-success';
    }
    else if(choice.consequenceType == CONSEQUENCE_NEGATIVE){
      btnClass = 'btn-danger';
    }

    $continue
      .removeClass('btn-primary btn-success btn-danger')
      .addClass( btnClass );

    var $effectText = $modal.find('.modal-body').html(''),
        $consequence = $('<p/>').text( choice.consequence );

    $effectText
      .append( $consequence )
      .append( $effects );

    $effects.fadeIn( Game.options.fadeTime );

    Game.setResources();

    try {
      var sound = choice.consequenceType + '.mp3';
      lowLag.play( sound ); //Positive.mp3, Neutral.mp3, Negative.mp3
    }catch(e){}
  },

  calcQoL: function(){
    var sum = 0, num = 0, hiddenFactors = 0;

    $.each(Game.resources, function(){
      var resource = this;
      if(resource.type == 'factor') {
        sum += resource.num;
        num++;
      } else if(resource.type == 'hidden') {
        hiddenFactors += resource.num;
      }
    });

    var avg = Math.round(sum / num);

    var qol = avg;

    qol = qol + Math.round(hiddenFactors * Game.options.hiddenFactorWeight);

    console.log('avg', avg, 'sum', sum, 'num', num);

    Game.resources.quality_of_life.num = qol;

    $('li.quality_of_life .number').text(qol);

    return qol;
  },

  end: function(){
    $('.end-screen .score').text(Game.calcQoL());
    $('.bar').width( '100%' );

    if(Game.resources.economy.num > Game.resources.environment.num) {
      $('#final-industry').fadeIn(Game.options.fadeTime);
    } else {
      $('#final-environment').fadeIn(Game.options.fadeTime);
    }
  },

  changeDate: function( daysToAdd ){
    if(typeof(daysToAdd) != 'undefined') {
      Game.now.setDate(Game.now.getDate() + daysToAdd);
    }
    $('.date').text(Game.monthNames[Game.now.getMonth()] + ' ' + Game.now.getDate() + ', ' + Game.now.getFullYear()).fadeIn( Game.options.fadeTime );
    $('.progress-container').fadeIn(Game.options.fadeTime);
    $('.bar').width( Math.round( (Game.playIndex - 1) / Game.playOrder.length * 100 ) + '%' );
  }

};

$(document).ready(function(){
  Game.init();
});